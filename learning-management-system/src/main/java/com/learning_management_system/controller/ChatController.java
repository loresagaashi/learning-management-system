package com.learning_management_system.controller;

import com.learning_management_system.payload.ChatMessage;
import com.learning_management_system.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/private-message")
    public void sendPrivateMessage(ChatMessage message) {
        chatService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(
                String.valueOf(message.getRecipientId()), "/queue/messages", message);
    }
}
