package com.learning_management_system.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.learning_management_system.enums.Gender;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Student extends UserAccount {

    @Transient
    private String type = "Student";

    @Column(unique = true, nullable = false)
    private Long studentId; // Numeric student ID

    private LocalDate enrollmentDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = true, foreignKey = @ForeignKey(name = "fk_student_city", foreignKeyDefinition = "FOREIGN KEY (city_id) REFERENCES City(id) ON DELETE RESTRICT"))
    private City city;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonBackReference("student-group")
    private StudentGroup group;


    @ManyToOne
    @JoinColumn(name = "active_semester_id")
    @JsonIgnore
    private Semester activeSemester;

    @Enumerated(EnumType.STRING) // Enum mapping to string in the database
    private Gender gender; // M for Male, F for Female

    @OneToMany(mappedBy = "student")
    private List<Grade> grades;
    @ManyToMany
    private List<Course> courses;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    // @JsonManagedReference
    @JsonIgnore
    private List<StudentSemester> studentSemesters;

}