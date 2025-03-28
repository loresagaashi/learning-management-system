package com.learning_management_system.service;

import com.learning_management_system.model.ChatMessageEntity;
import com.learning_management_system.payload.ChatMessage;
import com.learning_management_system.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public void saveMessage(ChatMessage message) {
        ChatMessageEntity entity = new ChatMessageEntity();
        entity.setSenderId(message.getSenderId());
        entity.setRecipientId(message.getRecipientId());
        entity.setContent(message.getContent());
        chatMessageRepository.save(entity);
    }

    public List<ChatMessage> getMessagesBetween(Long senderId, Long recipientId) {
        List<ChatMessageEntity> entities = chatMessageRepository.findConversation(senderId, recipientId);
        return entities.stream()
                .map(e -> new ChatMessage(e.getSenderId(), e.getRecipientId(), e.getContent()))
                .collect(Collectors.toList());
    }

}
