package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Schedule;
import com.learning_management_system.service.ScheduleService;

@RestController
@RequestMapping("/schedules")
public class ScheduleController extends BasicControllerOperations<ScheduleService, Schedule>{

    public ScheduleController (ScheduleService service){
        super(service);
    }
    
}
