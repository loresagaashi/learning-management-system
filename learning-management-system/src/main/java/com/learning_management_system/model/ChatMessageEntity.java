package com.learning_management_system.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class ChatMessageEntity extends BaseEntity{

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "recipent_id")
    private Long recipientId;

    @Column(name = "content")
    private String content;

    @Column(name = "is_read")
    private boolean isRead = false;
}
