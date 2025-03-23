package com.learning_management_system.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "logs")
public class Log extends BaseAuditEntity{

    @Column(name = "action")
    private String action;

    @Column(name = "message",columnDefinition = "TEXT")
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_log_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = true, foreignKey = @ForeignKey(name = "fk_log_professor", foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    private Professor professor;

}
