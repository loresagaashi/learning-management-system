package com.learning_management_system.service;

import com.learning_management_system.model.Generation;
import com.learning_management_system.repository.GenerationRepository;
import org.springframework.stereotype.Service;

@Service
public class GenerationService extends BasicServiceOperations<GenerationRepository, Generation> {
    public GenerationService(GenerationRepository repository) {
        super(repository);
    }
}