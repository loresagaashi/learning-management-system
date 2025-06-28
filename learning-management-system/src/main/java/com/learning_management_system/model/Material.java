package com.learning_management_system.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "materials")
public class Material {

    @Id
    private String id;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Lecture lecture;
     // Store the Lecture's ID (assumes Lecture uses Long or UUID in PostgreSQL)
    private Long lectureId;

    private String fileUrl;

    private String description;

    @CreatedDate
    private LocalDateTime createdOn;

}
