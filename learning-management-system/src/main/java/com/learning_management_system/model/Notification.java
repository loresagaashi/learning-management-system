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
public class Notification extends BaseEntity {
    
//     @ManyToOne
// @JoinColumn(name = "user_id", nullable = true, foreignKey = @ForeignKey(name = "fk_notification_user", foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE RESTRICT"))
//     private User user;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private LocalDate timestamp;
}

