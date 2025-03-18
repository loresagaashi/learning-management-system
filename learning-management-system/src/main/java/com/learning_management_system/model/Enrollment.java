package com.learning_management_system.model;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Enrollment extends BaseEntity {
    // @EmbeddedId
    // private EnrollmentId enrollmentId;
    
//     @ManyToOne
//     @MapsId("studentId")
// @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_enrollment_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))

//     private Student student;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_enrollment_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
    private Course course;
    
    private Date enrollmentDate;
    
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;
}


