package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Assignment;
import com.learning_management_system.service.AssignmentService;

@RestController
@RequestMapping("/assignment")
public class AssignmentController extends BasicControllerOperations<AssignmentService, Assignment> {

   public AssignmentController(AssignmentService service) {
      super(service);
   }

}