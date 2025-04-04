package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Grade;
import com.learning_management_system.service.GradeService;

@RestController
@RequestMapping("/grades")
public class GradeController extends BasicControllerOperations<GradeService, Grade> {

   public GradeController(GradeService service) {
      super(service);
   }

}
