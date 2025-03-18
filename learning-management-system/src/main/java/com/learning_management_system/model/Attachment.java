package com.learning_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Attachment extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = true, foreignKey = @ForeignKey(name = "fk_attachment_submission", foreignKeyDefinition = "FOREIGN KEY (submission_id) REFERENCES Submission(id) ON DELETE RESTRICT"))
    private Submission submission;
    
    private String fileUrl;
    private String description;
}

