package com.learning_management_system.controller;

import com.learning_management_system.model.Professor;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.ProfessorService;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class ProfessorController extends BasicControllerOperations<ProfessorService, Professor>{

    public ProfessorController(ProfessorService service){
        super(service);
    }

        @PostMapping("/login")
    public Professor login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
}