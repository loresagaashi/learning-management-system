package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Attachment;
import com.learning_management_system.repository.AttachmentRepository;

@Service
public class AttachmentService extends BasicServiceOperations<AttachmentRepository, Attachment>{

    public AttachmentService(AttachmentRepository repository){
        super(repository);
    }
}