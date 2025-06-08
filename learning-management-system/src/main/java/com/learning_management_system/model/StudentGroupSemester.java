package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class StudentGroupSemester extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "group_id")
    private StudentGroup group;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @OneToMany(mappedBy = "groupSemester", cascade = CascadeType.ALL)
    private List<Schedule> schedules;
}