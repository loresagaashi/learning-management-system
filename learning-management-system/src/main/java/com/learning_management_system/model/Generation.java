package com.learning_management_system.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.learning_management_system.enums.DegreeType;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Generation extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name; // p.sh. "2024/2025"

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private DegreeType degreeType;

    @OneToMany(mappedBy = "generation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("generation-groups")
    private List<StudentGroup> groups;

    @OneToMany(mappedBy = "generation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("generation-semesters")
    private List<Semester> semesters;

    public Generation() {
        int currentYear = LocalDateTime.now().getYear();
        this.name = currentYear + "/" + (currentYear + 1);
    }
}