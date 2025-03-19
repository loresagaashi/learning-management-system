package com.learning_management_system.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Submission extends BaseEntity {
    
   @ManyToOne
   @JoinColumn(name = "assignment_id", nullable = false)
   private Assignment assignment;
    
   // @ManyToOne
   // @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_submission_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
   // private Student student;
    
   private LocalDate submissionDate;
   
   private String fileUrl;

}
