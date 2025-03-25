package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Message;
import com.learning_management_system.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController extends BasicMongoControllerOperations<MessageService,Message>{

    public MessageController(MessageService service){
        super(service);
    }

}