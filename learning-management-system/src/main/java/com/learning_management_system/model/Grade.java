package com.learning_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Grade extends BaseEntity {
    
   @ManyToOne
   @JoinColumn(name = "assignment_id", nullable = true, foreignKey = @ForeignKey(name = "fk_grade_assignment", foreignKeyDefinition = "FOREIGN KEY (assignment_id) REFERENCES Assignment(id) ON DELETE RESTRICT"))
   private Assignment assignment;
    
   @ManyToOne
   @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_grade_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
   private Student student;
    
   private Integer grade;

}
