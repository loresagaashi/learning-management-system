package com.learning_management_system.repository;

import com.learning_management_system.model.Notification;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification, String> {
}
