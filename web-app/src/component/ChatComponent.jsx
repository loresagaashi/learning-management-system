import { Client } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { getChatHistory, markMessagesAsRead, sendChatMessage } from '../service/chatService';
import { ProfessorService } from '../service/ProfessorService';
import { getCurrentUser } from '../service/ServiceMe';
import { StudentService } from '../service/StudentService';

const ChatComponent = () => {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});

  const typingTimeoutRef = useRef(null);
  const stompClientRef = useRef(null);

  const professorService = new ProfessorService();
  const studentService = new StudentService();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userRes, profsRes, studsRes] = await Promise.all([
          getCurrentUser(),
          professorService.findAll(),
          studentService.findAll()
        ]);
        setUser(userRes.data);
        setProfessors(profsRes);
        setStudents(studsRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!user) return;

    const socket = new SockJS('http://localhost:8080/chat');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe(`/user/${user.userId}/queue/messages`, (msg) => {
          const message = JSON.parse(msg.body);
          if (selectedUser && message.senderId === selectedUser.id) {
            setMessages(prev => [...prev, message]);
          } else {
            setUnreadCounts(prev => ({
              ...prev,
              [message.senderId]: (prev[message.senderId] || 0) + 1
            }));
          }
        });

        stompClient.subscribe(`/user/${user.userId}/queue/typing`, (msg) => {
          const typingData = JSON.parse(msg.body);
          if (typingData.senderId === selectedUser?.id) {
            setIsTyping(true);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
          }
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate().catch(err => console.error("STOMP deactivate error:", err));
    };
  }, [user, selectedUser]);

  useEffect(() => {
    setIsTyping(false);
  }, [selectedUser]);

  const handleSelectUser = (u) => {
    setSelectedUser(u);

    // Fshij unread count për këtë përdorues
    setUnreadCounts(prev => {
      const updated = { ...prev };
      delete updated[u.id];
      return updated;
    });

    if (user && u) {
      getChatHistory(user.userId, u.id)
        .then(res => setMessages(res.data))
        .catch(err => console.error("Error fetching history:", err));

      markMessagesAsRead(user.userId, u.id);
    }
  };

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      senderId: user.userId,
      recipientId: selectedUser.id,
      content: messageInput,
    };

    stompClientRef.current?.publish({
      destination: '/app/private-message',
      body: JSON.stringify(newMsg),
    });

    sendChatMessage(newMsg);
    setMessages(prev => [...prev, newMsg]);
    setMessageInput('');
  };

  const sendTypingStatus = () => {
    if (selectedUser && stompClientRef.current) {
      stompClientRef.current.publish({
        destination: "/app/typing",
        body: JSON.stringify({
          senderId: user.userId,
          recipientId: selectedUser.id,
          typing: true
        }),
      });
    }
  };

  const renderUserList = (title, list) => (
    <div style={{ marginBottom: '10px' }}>
      <div
        onClick={() => setExpandedGroup(expandedGroup === title ? null : title)}
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
      >
        {title}
      </div>
      {expandedGroup === title && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Array.isArray(list) && list.map(u => (
            <li
              key={u.id}
              onClick={() => handleSelectUser(u)}
              style={{
                padding: '5px 0',
                cursor: 'pointer',
                color: selectedUser?.id === u.id ? 'blue' : 'black'
              }}
            >
              {u.firstName} {u.lastName}
              {unreadCounts[u.id] > 0 && (
                <span style={{
                  marginLeft: 8,
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: 12
                }}>
                  {unreadCounts[u.id]}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '90vh', border: '1px solid #ccc' }}>
      <div style={{ width: '25%', padding: '20px', borderRight: '1px solid #eee', overflowY: 'auto' }}>
        <h3 style={{ marginBottom: '20px' }}>{user?.firstName} {user?.lastName}</h3>
        {renderUserList('Professors', professors)}
        {renderUserList('Students', students)}
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        {selectedUser ? (
          <>
            <h4 style={{ marginBottom: '10px' }}>Chat with {selectedUser.firstName}</h4>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
              {messages.length > 0 ? (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      textAlign: msg.senderId === user.userId ? 'right' : 'left',
                      marginBottom: '5px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        background: msg.senderId === user.userId ? '#e0f7fa' : '#f1f1f1',
                        padding: '8px 12px',
                        borderRadius: '15px',
                        maxWidth: '60%',
                        wordWrap: 'break-word',
                      }}
                    >
                      {msg.content}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#aaa', marginTop: '20%' }}>
                  <p>No Messages</p>
                  <small>Write a message to begin the conversation</small>
                </div>
              )}
              {isTyping && (
                <div style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'gray' }}>
                  {selectedUser.firstName} is typing...
                </div>
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  sendTypingStatus();
                }}
                style={{ flex: 1, padding: '10px' }}
                placeholder="Type your message..."
              />
              <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px' }}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '40%' }}>
            <h4>Select a user to start chatting</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
