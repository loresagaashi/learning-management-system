package com.learning_management_system.model;

import java.time.LocalDate;

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

}