package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Assignment;
import com.learning_management_system.service.AssignmentService;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController extends BasicControllerOperations<AssignmentService, Assignment> {

   public AssignmentController(AssignmentService service) {
      super(service);
   }

   @GetMapping("/course/{courseId}")
   public List<Assignment> getAssignmentsByCourse(@PathVariable Long courseId) {
      return service.findByCourseId(courseId);
   }
}