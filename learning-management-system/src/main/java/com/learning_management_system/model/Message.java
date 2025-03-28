package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "messages")
public class Message {

    @Id
    private String id;

    @DocumentReference(lazy = true)
    private Student student;

    @DocumentReference(lazy = true)
    private Professor professor;

    private String content;

    private LocalDate sentDate;
}
