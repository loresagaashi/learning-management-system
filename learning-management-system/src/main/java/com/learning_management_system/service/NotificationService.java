package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Notification;
import com.learning_management_system.repository.NotificationRepository;

@Service
public class NotificationService extends BasicMongoServiceOperations<NotificationRepository, Notification>{

    public NotificationService(NotificationRepository repository){
        super(repository);
    }
}