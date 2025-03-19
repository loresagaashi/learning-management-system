package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Message;
import com.learning_management_system.repository.MessageRepository;

@Service
public class MessageService extends BasicServiceOperations<MessageRepository, Message>{

    public MessageService(MessageRepository repository){
        super(repository);
    }
}