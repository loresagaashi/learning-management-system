package com.learning_management_system.service;

import com.learning_management_system.model.Log;
import com.learning_management_system.repository.LogRepository;
import org.springframework.stereotype.Service;

@Service
public class LogService extends BasicMongoServiceOperations<LogRepository, Log>{
    protected LogService(LogRepository repository) {
        super(repository);
    }
}