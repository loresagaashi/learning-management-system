package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Course extends BaseEntity {

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    @JoinTable(name = "course_professor",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id"),
            foreignKey = @ForeignKey(name = "fk_course_professor_offer",
                    foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES  Course(id) ON DELETE RESTRICT"),
            inverseForeignKey = @ForeignKey(name = "fk_course_professor_professor",
                    foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    private List<Professor> professor;

    @ManyToOne
    @JoinColumn(name = "orientation_id", nullable = true, foreignKey = @ForeignKey(name = "fk_course_orientation", foreignKeyDefinition = "FOREIGN KEY (orientation_id) REFERENCES Orientation(id) ON DELETE RESTRICT"))
    private Orientation orientation;

}
