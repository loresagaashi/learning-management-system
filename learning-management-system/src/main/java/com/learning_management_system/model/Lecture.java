package com.learning_management_system.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Lecture extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_lecture_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))

    private Course course;

    private LocalDate lectureDate;
    private String topic;
}
