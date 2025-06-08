package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
@Document(collection = "reports")
public class Report {

    @Id
    private String id;

    private LocalDate reportDate;

    private String performance;

    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Student student;
    private Long studentId;
}
