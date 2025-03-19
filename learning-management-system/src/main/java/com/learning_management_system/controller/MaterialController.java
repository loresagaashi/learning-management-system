package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Material;
import com.learning_management_system.service.MaterialService;

@RestController
@RequestMapping("/materials")
public class MaterialController extends BasicControllerOperations<MaterialService,Material>{

    public MaterialController(MaterialService service){
        super(service);
    }

}