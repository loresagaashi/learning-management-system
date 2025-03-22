package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Student;
import com.learning_management_system.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController extends BasicControllerOperations<StudentService, Student>{

    public StudentController (StudentService service){
        super(service);
    }
    
}