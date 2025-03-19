package com.learning_management_system.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Message extends BaseEntity {
    
    // @ManyToOne
    // @JoinColumn(name = "sender_id", nullable = true, foreignKey = @ForeignKey(name = "fk_message_sender", foreignKeyDefinition = "FOREIGN KEY (sender_id) REFERENCES User(id) ON DELETE RESTRICT"))
    // private User sender;
    
    // @ManyToOne
    // @JoinColumn(name = "receiver_id", nullable = true, foreignKey = @ForeignKey(name = "fk_message_receiver", foreignKeyDefinition = "FOREIGN KEY (receiver_id) REFERENCES User(id) ON DELETE RESTRICT"))
    // private User receiver;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private LocalDate sentDate;
}

