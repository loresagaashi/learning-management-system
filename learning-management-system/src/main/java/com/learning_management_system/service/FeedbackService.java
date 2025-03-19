package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Feedback;
import com.learning_management_system.repository.FeedbackRepository;

@Service
public class FeedbackService extends BasicServiceOperations<FeedbackRepository, Feedback> {

    public FeedbackService (FeedbackRepository repository){
        super(repository);
    }
    
}
