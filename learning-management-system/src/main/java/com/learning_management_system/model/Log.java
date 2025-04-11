package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "logs")
public class Log {

    @Id
    private String id;

    private String message;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Student student;

    private Long studentId;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Professor professor;

    private Long professorId;

}
