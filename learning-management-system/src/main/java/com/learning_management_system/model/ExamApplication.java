package com.learning_management_system.model;

import com.learning_management_system.enums.ExamStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class ExamApplication extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    private Double grade;

    @Enumerated(EnumType.STRING)
    private ExamStatus status;
}
