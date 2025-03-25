package com.learning_management_system.repository;

import com.learning_management_system.model.Log;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRepository extends MongoRepository<Log, String> {
}
