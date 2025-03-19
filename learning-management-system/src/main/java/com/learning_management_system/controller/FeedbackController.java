package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Feedback;
import com.learning_management_system.service.FeedbackService;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController extends BasicControllerOperations<FeedbackService, Feedback>{

    public FeedbackController(FeedbackService service){
        super(service);
    }
    
}
