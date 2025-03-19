package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Schedule;
import com.learning_management_system.repository.ScheduleRepository;

@Service
public class ScheduleService extends BasicServiceOperations<ScheduleRepository, Schedule> {

    
    public ScheduleService(ScheduleRepository repository){
        super(repository);
    }
    
}
