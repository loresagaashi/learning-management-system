package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "materials")
public class Material {

    @Id
    private String id;

    @DocumentReference
    private Lecture lecture;
     // Store the Lecture's ID (assumes Lecture uses Long or UUID in PostgreSQL)
    private Long lectureId;

    private String fileUrl;
    private String description;

}

