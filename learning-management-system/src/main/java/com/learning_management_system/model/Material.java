package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Material extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "lecture_id", nullable = true, foreignKey = @ForeignKey(name = "fk_material_lecture", foreignKeyDefinition = "FOREIGN KEY (lecture_id) REFERENCES Lecture(id) ON DELETE RESTRICT"))
    private Lecture lecture;
    
    private String fileUrl;
    private String description;
}

