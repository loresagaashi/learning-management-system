package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Professor;
import com.learning_management_system.repository.ProfessorRepository;

@Service
public class ProfessorService extends BasicServiceOperations<ProfessorRepository, Professor>{

    public ProfessorService(ProfessorRepository repository){
        super(repository);
    }
}