package com.learning_management_system.controller;

import com.learning_management_system.model.Professor;
import com.learning_management_system.service.ProfessorService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class ProfessorController extends BasicControllerOperations<ProfessorService, Professor>{

    public ProfessorController(ProfessorService service){
        super(service);
    }
}