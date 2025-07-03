package com.learning_management_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

   @PostMapping("/upload")
   public ResponseEntity<?> uploadSubmission(
         @RequestParam("file") MultipartFile file,
         @RequestParam("assignmentId") Long assignmentId,
         @RequestParam("studentId") Long studentId) {
      try {
         Submission submission = service.uploadSubmission(file, assignmentId, studentId);
         return ResponseEntity.ok(submission);
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Failed to upload submission: " + e.getMessage());
      }
   }
}