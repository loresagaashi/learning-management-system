package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Orientation;
import com.learning_management_system.repository.OrientationRepository;

@Service
public class OrientationService extends BasicServiceOperations<OrientationRepository, Orientation>{

    public OrientationService(OrientationRepository repository){
        super(repository);
    }
}
