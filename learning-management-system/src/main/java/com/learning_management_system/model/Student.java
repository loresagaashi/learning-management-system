package com.learning_management_system.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Student extends UserAccount {

    @Column(unique = true, nullable = false)
    private Long studentId; // Numeric student ID

    private LocalDate enrollmentDate;

    @Enumerated(EnumType.STRING) 
    @Column(nullable = false)
    private Status status;
}