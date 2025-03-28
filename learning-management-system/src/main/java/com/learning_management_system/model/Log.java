package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "logs")
public class Log {

    @Id
    private String id;

    private String message;

    @DocumentReference(lazy = true)
    private Student student;

    @DocumentReference(lazy = true)
    private Professor professor;

}
