package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Enrollment;
import com.learning_management_system.repository.EnrollmentRepository;

@Service
public class EnrollmentService extends BasicServiceOperations<EnrollmentRepository, Enrollment>{

    public EnrollmentService(EnrollmentRepository repository){
        super(repository);
    }
}
