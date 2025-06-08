package com.learning_management_system.controller;

import com.learning_management_system.model.Log;
import com.learning_management_system.model.Material;
import com.learning_management_system.service.LogService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logs")
public class LogController extends BasicMongoControllerOperations<LogService, Log> {
    @Autowired
    private LogService logService;

    public LogController(LogService service) {
        super(service);
    }

    @GetMapping("/all")
    public List<Log> findAll() {
        return logService.findAllWithStudentAndProfessorNames();
    }

    @PostMapping("/save")
    public Log saveLogWithStudentAndProfessor(@RequestBody Log log) {
        return logService.saveLogWithStudentAndProfessor(log);
    }

}