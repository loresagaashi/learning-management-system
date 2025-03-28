package com.learning_management_system.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class ChatMessageEntity extends BaseEntity{
    private Long senderId;
    private Long recipientId;
    private String content;
}
