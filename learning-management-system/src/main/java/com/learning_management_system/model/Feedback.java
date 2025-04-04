package com.learning_management_system.model;

import java.security.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Feedback extends BaseEntity {

   @ManyToOne
   @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_feedback_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
   private Student student;

   @ManyToOne
   @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_feedback_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
   private Course course;

   private int rating;
   private String comment;
   private LocalDateTime createdAt;
}
