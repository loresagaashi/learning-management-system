package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Getter
@Setter
@Document(collection = "reports")
public class Report {

    @Id
    private String id;

    private LocalDate reportDate;

    private String performance;

    @DocumentReference(lazy = true)
    private Student student;
}
