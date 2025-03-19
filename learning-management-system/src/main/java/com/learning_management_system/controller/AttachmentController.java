package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Attachment;
import com.learning_management_system.service.AttachmentService;

@RestController
@RequestMapping("/attachment")
public class AttachmentController extends BasicControllerOperations<AttachmentService,Attachment>{

    public AttachmentController(AttachmentService service){
        super(service);
    }

}