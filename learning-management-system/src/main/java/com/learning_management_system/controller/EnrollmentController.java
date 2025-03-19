package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Enrollment;
import com.learning_management_system.service.EnrollmentService;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController extends BasicControllerOperations<EnrollmentService, Enrollment> {

    public EnrollmentController(EnrollmentService service){
        super(service);
    }
}
