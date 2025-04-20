package com.learning_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Exam extends BaseEntity{

    private String title;

    private LocalDateTime dateTime;

    private String location;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false, foreignKey = @ForeignKey(name = "fk_exam_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE"))
    private Course course;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false, foreignKey = @ForeignKey(name = "fk_exam_professor", foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE SET NULL"))
    private Professor professor;


}
