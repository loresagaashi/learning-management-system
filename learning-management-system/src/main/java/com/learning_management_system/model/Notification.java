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
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_message_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true, foreignKey = @ForeignKey(name = "fk_message_professor", foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    private Professor professor;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private LocalDate timestamp;
}

