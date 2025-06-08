package com.learning_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Log;
import com.learning_management_system.model.Notification;
import com.learning_management_system.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController extends BasicMongoControllerOperations<NotificationService,Notification>{
    @Autowired
    private NotificationService notificationService;
    public NotificationController(NotificationService service){
        super(service);
    }
     @GetMapping("/all")
    public List<Notification> findAll() {
        return notificationService.findAllWithStudentAndProfessorNames();
    }

    @PostMapping("/save")
    public Notification saveNotificationWithStudentAndProfessor(@RequestBody Notification notification) {
        return notificationService.saveNotificationWithStudentAndProfessor(notification);
    }
}