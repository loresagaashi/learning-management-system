package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Semester extends BaseEntity {

    @Column(nullable = false, name = "name")
    private String name; // p.sh. "Semestri 1", "Semestri 2"

    @Column(name = "season")
    private String season; // p.sh. "Vjeshtor", "Dimeror"

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "generation_id")
    private Generation generation;

    @OneToMany(mappedBy = "semester")
    @JsonManagedReference("semester-studentsemesters")
    private List<StudentSemester> studentSemesters;
}
