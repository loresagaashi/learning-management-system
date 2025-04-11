package com.learning_management_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Professor extends UserAccount {
    @Transient
    private String type = "Professor";
    @NotEmpty
    private String department;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = true, foreignKey = @ForeignKey(name = "fk_professor_city", foreignKeyDefinition = "FOREIGN KEY (city_id) REFERENCES City(id) ON DELETE RESTRICT"))
    private City city;

//    @ManyToMany
//    @JoinTable(name = "professor_course",
//            joinColumns = @JoinColumn(name = "professor_id"),
//            inverseJoinColumns = @JoinColumn(name = "course_id"),
//            foreignKey = @ForeignKey(name = "fk_professor_course_professor",
//                    foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"),
//            inverseForeignKey = @ForeignKey(name = "fk_professor_course_course",
//                    foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
//    private List<Course> courses;
}