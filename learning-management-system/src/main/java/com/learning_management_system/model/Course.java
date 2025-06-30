package com.learning_management_system.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Course extends BaseEntity {

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "course_professor",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id"),
            foreignKey = @ForeignKey(name = "fk_course_professor_offer",
                    foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES  Course(id) ON DELETE RESTRICT"),
            inverseForeignKey = @ForeignKey(name = "fk_course_professor_professor",
                    foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    @JsonIgnore
    private List<Professor> professor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "orientation_id", nullable = true, foreignKey = @ForeignKey(name = "fk_course_orientation", foreignKeyDefinition = "FOREIGN KEY (orientation_id) REFERENCES Orientation(id) ON DELETE RESTRICT"))
    private Orientation orientation;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lecture> lectures;

    @Column(name = "credits")
    private Long credits;

    @Column(name = "type")
    private String type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "semester_id")
    private Semester semester;
}