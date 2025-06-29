package com.learning_management_system.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class StudentGroup extends BaseEntity {

    @Column(nullable = false)
    private String name; // p.sh. "G1", "G2"

    private Integer capacity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "generation_id")
    @JsonBackReference("generation-groups")
    private Generation generation;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @OneToMany(mappedBy = "group")
    @JsonManagedReference("student-group")
    private List<Student> students;
}
