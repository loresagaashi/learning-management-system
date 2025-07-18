package com.learning_management_system.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Lecture extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_lecture_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
    @JsonIgnoreProperties({"lectures"})
    private Course course;
    private String name;
    private LocalDate lectureDate;
    private String topic;

    // Transient field to hold materials for JSON serialization
    @Transient
    @JsonIgnore
    private List<Material> materials;

}
