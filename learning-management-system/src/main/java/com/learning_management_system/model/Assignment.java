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
public class Assignment extends BaseEntity {

   @ManyToOne
   @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_assignment_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
   private Course course;

   private String title;

   @Column(columnDefinition = "TEXT")
   private String description;

   private LocalDate dueDate;
}
