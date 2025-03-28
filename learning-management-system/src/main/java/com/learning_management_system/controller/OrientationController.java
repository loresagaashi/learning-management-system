package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Orientation;
import com.learning_management_system.service.OrientationService;

@RestController
@RequestMapping("/orientations")
public class OrientationController extends BasicControllerOperations<OrientationService, Orientation> {

    public OrientationController(OrientationService service){
        super(service);
    }
}