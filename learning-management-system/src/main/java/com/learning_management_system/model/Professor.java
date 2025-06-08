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
    
    @OneToMany(mappedBy = "professor")
    private List<Course> courses;
}