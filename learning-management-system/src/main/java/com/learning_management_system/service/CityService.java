package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.City;
import com.learning_management_system.repository.CityRepository;

@Service
public class CityService extends BasicServiceOperations<CityRepository, City>{

    public CityService(CityRepository repository){
        super(repository);
    }
}
