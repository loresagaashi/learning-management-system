package com.learning_management_system.repository;

import com.learning_management_system.model.Message;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
