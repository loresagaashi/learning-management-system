package com.learning_management_system.model;

import java.time.LocalDate;
import java.util.List;

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
    private StudentGroup group;

    @Enumerated(EnumType.STRING) // Enum mapping to string in the database
    private Gender gender; // M for Male, F for Female

    @OneToMany(mappedBy = "student")
    private List<Grade> grades;
    @ManyToMany
    private List<Course> courses;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<StudentSemester> studentSemesters;

}