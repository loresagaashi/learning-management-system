package com.learning_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ForeignKey;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Professor extends UserAccount {
    @NotEmpty
    private String department;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = true, foreignKey = @ForeignKey(name = "fk_professor_city", foreignKeyDefinition = "FOREIGN KEY (city_id) REFERENCES City(id) ON DELETE RESTRICT"))
    private City city;
}