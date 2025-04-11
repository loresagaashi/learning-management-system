package com.learning_management_system.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Generation extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name; // p.sh. "2024/2025"

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @OneToMany(mappedBy = "generation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentGroup> groups;
}