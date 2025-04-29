package com.learning_management_system.controller;


import com.learning_management_system.payload.ChatMessage;
import com.learning_management_system.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {
    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatMessage message) {
        chatService.saveMessage(message);
    }

    @GetMapping("/history")
    public List<ChatMessage> getMessages(@RequestParam Long senderId, @RequestParam Long recipientId) {
        return chatService.getMessagesBetween(senderId, recipientId);
    }

    @PostMapping("/mark-as-read")
    public ResponseEntity<?> markMessagesAsRead(@RequestBody ChatMessage request) {
        chatService.markAsRead(request.getSenderId(), request.getRecipientId());
        return ResponseEntity.ok().build();
    }
}
