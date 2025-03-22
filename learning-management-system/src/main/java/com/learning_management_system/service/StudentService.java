package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Student;
import com.learning_management_system.repository.StudentRepository;

@Service
public class StudentService extends BasicServiceOperations<StudentRepository, Student> {

    public StudentService(StudentRepository repository){
        super(repository);
    }
    
}

