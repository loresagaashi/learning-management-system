package com.learning_management_system.controller;

import com.learning_management_system.enums.DegreeType;
import com.learning_management_system.model.Generation;
import com.learning_management_system.service.GenerationService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/generations")
public class GenerationController extends BasicControllerOperations<GenerationService, Generation> {
    public GenerationController(GenerationService service) {
        super(service);
    }

    @GetMapping("/by-degree-type")
    public List<Generation> getGenerationsByDegreeType(@RequestParam("type") DegreeType degreeType) {
        return service.findByDegreeType(degreeType);
    }
    
}
