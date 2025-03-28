package com.learning_management_system.repository;

import com.learning_management_system.model.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    @Query("SELECT m FROM ChatMessageEntity m WHERE (m.senderId = :senderId AND m.recipientId = :recipientId) OR (m.senderId = :recipientId AND m.recipientId = :senderId) ORDER BY m.id ASC")
    List<ChatMessageEntity> findConversation(@Param("senderId") Long senderId, @Param("recipientId") Long recipientId);
}