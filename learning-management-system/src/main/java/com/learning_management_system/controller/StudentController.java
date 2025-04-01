package com.learning_management_system.controller;

import com.learning_management_system.data.student.StudentSearchDTO;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.learning_management_system.model.Student;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController extends BasicControllerOperations<StudentService, Student>{

    private final StudentService studentService;

    public StudentController (StudentService service, StudentService studentService){
        super(service);
        this.studentService = studentService;
    }
        @PostMapping("/login")
    public Student login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }

    @GetMapping("/search-students")
    public List<StudentSearchDTO> getStudents(@RequestParam(required = false) String search) {
        return studentService.getStudents(search);
    }
}