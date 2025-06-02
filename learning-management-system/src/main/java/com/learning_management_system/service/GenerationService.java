package com.learning_management_system.service;

import java.util.List;

import com.learning_management_system.enums.DegreeType;
import com.learning_management_system.model.Generation;
import com.learning_management_system.repository.GenerationRepository;
import org.springframework.stereotype.Service;

@Service
public class GenerationService extends BasicServiceOperations<GenerationRepository, Generation> {
    public GenerationService(GenerationRepository repository) {
        super(repository);
    }
    public List<Generation> findByDegreeType(DegreeType degreeType) {
        System.out.println("Finding generations for degree type: " + degreeType);
        List<Generation> generations = repository.findByDegreeType(degreeType);
        System.out.println("Found " + generations.size() + " generations");
        return generations;
    }
}