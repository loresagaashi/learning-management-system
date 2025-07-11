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

   @ManyToOne
   @JoinColumn(name = "lecture_id", nullable = true, foreignKey = @ForeignKey(name = "fk_grade_lecture", foreignKeyDefinition = "FOREIGN KEY (lecture_id) REFERENCES Lecture(id) ON DELETE RESTRICT"))
   private Lecture lecture;

   @ManyToOne
   @JoinColumn(name = "exam_id", nullable = true, foreignKey = @ForeignKey(name = "fk_grade_exam", foreignKeyDefinition = "FOREIGN KEY (exam_id) REFERENCES Exam(id) ON DELETE RESTRICT"))
   private Exam exam;
    
   private Integer grade;

}
