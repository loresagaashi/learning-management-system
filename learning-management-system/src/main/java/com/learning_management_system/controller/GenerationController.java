package com.learning_management_system.controller;

import com.learning_management_system.model.Generation;
import com.learning_management_system.service.GenerationService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/generations")
public class GenerationController extends BasicControllerOperations<GenerationService, Generation> {
    public GenerationController(GenerationService service) {
        super(service);
    }
}
