package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class StudentSemester extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    @JsonBackReference("student-semesters")
    private Student student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "semester_id")
    @JsonBackReference("semester-students")
    private Semester semester;

    private LocalDateTime registrationDate;
}
