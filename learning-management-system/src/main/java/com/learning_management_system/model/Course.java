package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Course extends BaseEntity {
    
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true, foreignKey = @ForeignKey(name = "fk_course_professor", foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    private Professor professor;

    @ManyToOne
    @JoinColumn(
    name = "orientation_id", 
    nullable = true, 
    foreignKey = @ForeignKey(name = "fk_course_orientation", 
    foreignKeyDefinition = "FOREIGN KEY (orientation_id) REFERENCES Orientation(id) ON DELETE RESTRICT")
)
    private Orientation orientation;

}

