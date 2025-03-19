package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Submission;
import com.learning_management_system.service.SubmissionService;

@RestController
@RequestMapping("/submission")
public class SubmissionController extends BasicControllerOperations<SubmissionService, Submission> {

   public SubmissionController(SubmissionService service) {
      super(service);
   }

}