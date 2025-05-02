package com.learning_management_system.service;

import com.learning_management_system.model.Semester;
import com.learning_management_system.repository.SemesterRepository;
import org.springframework.stereotype.Service;

@Service
public class SemesterService extends BasicServiceOperations<SemesterRepository, Semester> {

    public SemesterService (SemesterRepository repository){
        super(repository);
    }
}

