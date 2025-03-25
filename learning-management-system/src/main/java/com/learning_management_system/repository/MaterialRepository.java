package com.learning_management_system.repository;

import com.learning_management_system.model.Material;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MaterialRepository extends MongoRepository<Material, String> {
}
