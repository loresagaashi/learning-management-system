package com.learning_management_system.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Student;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController extends BasicControllerOperations<StudentService, Student>{

    public StudentController (StudentService service){
        super(service);
    }
        @PostMapping("/login")
    public Student login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
}