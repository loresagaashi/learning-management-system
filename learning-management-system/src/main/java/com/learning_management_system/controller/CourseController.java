package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Course;
import com.learning_management_system.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController extends BasicControllerOperations<CourseService,Course>{

    public CourseController(CourseService service){
        super(service);
    }

}