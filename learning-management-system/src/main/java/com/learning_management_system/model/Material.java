package com.learning_management_system.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.annotation.Id;

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
    

    private String fileUrl;
    private String description;
}

