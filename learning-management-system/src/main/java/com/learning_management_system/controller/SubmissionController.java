package com.learning_management_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Submission;
import com.learning_management_system.service.SubmissionService;

import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController extends BasicControllerOperations<SubmissionService, Submission> {

   public SubmissionController(SubmissionService service) {
      super(service);
   }

   @GetMapping("/student/{studentId}")
   public ResponseEntity<List<Submission>> getSubmissionsByStudent(@PathVariable Long studentId) {
      List<Submission> submissions = service.findByStudentId(studentId);
      return ResponseEntity.ok(submissions);
   }
}