package com.learning_management_system.controller;

import com.learning_management_system.model.Semester;
import com.learning_management_system.service.SemesterService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/semester")
public class SemesterController extends BasicControllerOperations<SemesterService, Semester> {

    public SemesterController(SemesterService service) {
        super(service);
    }

}