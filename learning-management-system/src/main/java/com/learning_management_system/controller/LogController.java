package com.learning_management_system.controller;

import com.learning_management_system.model.Log;
import com.learning_management_system.service.LogService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logs")
public class LogController extends BasicMongoControllerOperations<LogService, Log> {

    public LogController(LogService service) {
        super(service);
    }

}