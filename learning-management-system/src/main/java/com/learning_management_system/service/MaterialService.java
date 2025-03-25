package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Material;
import com.learning_management_system.repository.MaterialRepository;

@Service
public class MaterialService extends BasicMongoServiceOperations<MaterialRepository, Material>{

    public MaterialService(MaterialRepository repository){
        super(repository);
    }
}
