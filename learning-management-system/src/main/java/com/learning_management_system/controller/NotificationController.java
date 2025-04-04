package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Notification;
import com.learning_management_system.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController extends BasicMongoControllerOperations<NotificationService,Notification>{

    public NotificationController(NotificationService service){
        super(service);
    }

}