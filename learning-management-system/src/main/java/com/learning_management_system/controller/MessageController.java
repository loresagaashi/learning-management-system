package com.learning_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Log;
import com.learning_management_system.model.Message;
import com.learning_management_system.service.MessageService;

@RestController
@RequestMapping("/messages")
public class MessageController extends BasicMongoControllerOperations<MessageService,Message>{
    @Autowired
    private MessageService messageService;
    public MessageController(MessageService service){
        super(service);
    }
    @GetMapping("/all")
    public List<Message> findAll() {
        return messageService.findAllWithStudentAndProfessorNames();
    }

    @PostMapping("/save")
    public Message saveMessageWithStudentAndProfessor(@RequestBody Message message) {
        return messageService.saveMessageWithStudentAndProfessor(message);
    }

}