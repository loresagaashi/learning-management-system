import { Client } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";

const Chat = ({ currentUser, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat"); 
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Rilidhet automatikisht nëse shkëputet
      onConnect: () => {
        console.log("Lidhja me STOMP u bë me sukses!");

        client.subscribe(`/user/${currentUser.name}/queue/messages`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Gabim në STOMP: ", frame);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [currentUser]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        sender: currentUser.name,
        recipient: recipient.name,
        content: message,
      };

      stompClient.publish({
        destination: "/app/private-message",
        body: JSON.stringify(chatMessage),
      });

      setMessages([...messages, chatMessage]);
      setMessage("");
    } else {
      console.warn("Lidhja STOMP nuk është aktive!");
    }
  };

  return (
    <div>
      <h3>Chat me {recipient.name}</h3>
      <div style={{ border: "1px solid black", height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Dërgo</button>
    </div>
  );
};

export default Chat;
