package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.service.LectureService;

@RestController
@RequestMapping("/lectures")
public class LectureController extends BasicControllerOperations<LectureService,Lecture>{

    public LectureController(LectureService service){
        super(service);
    }

}