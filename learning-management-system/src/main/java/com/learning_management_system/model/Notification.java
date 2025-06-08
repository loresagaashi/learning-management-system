package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Transient;

import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Student student;

    private Long studentId;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Professor professor;

    private Long professorId;

    private String message;

    private LocalDate timestamp;
}

