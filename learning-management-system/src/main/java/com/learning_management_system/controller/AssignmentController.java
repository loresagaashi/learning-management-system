package com.learning_management_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Assignment;
import com.learning_management_system.model.Grade;
import com.learning_management_system.service.AssignmentService;
import com.learning_management_system.data.assignment.AssignmentGradeDTO;
import com.learning_management_system.data.assignment.GradeAssignmentRequest;

import java.util.List;
import java.util.Optional;

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

   /**
    * Get all submissions for an assignment with grading information
    */
   @GetMapping("/{assignmentId}/submissions-for-grading")
   public ResponseEntity<List<AssignmentGradeDTO>> getAssignmentSubmissionsForGrading(@PathVariable Long assignmentId) {
      List<AssignmentGradeDTO> submissions = service.getAssignmentSubmissionsForGrading(assignmentId);
      return ResponseEntity.ok(submissions);
   }

   /**
    * Grade a student's assignment submission
    */
   @PostMapping("/grade")
   public ResponseEntity<Grade> gradeAssignment(@RequestBody GradeAssignmentRequest request) {
      Grade grade = service.gradeAssignment(request);
      return ResponseEntity.ok(grade);
   }

   /**
    * Get all grades for a specific assignment
    */
   @GetMapping("/{assignmentId}/grades")
   public ResponseEntity<List<Grade>> getAssignmentGrades(@PathVariable Long assignmentId) {
      List<Grade> grades = service.getAssignmentGrades(assignmentId);
      return ResponseEntity.ok(grades);
   }

   /**
    * Get grade for a specific student's assignment
    */
   @GetMapping("/{assignmentId}/student/{studentId}/grade")
   public ResponseEntity<Grade> getStudentAssignmentGrade(@PathVariable Long assignmentId, @PathVariable Long studentId) {
      Optional<Grade> grade = service.getStudentAssignmentGrade(assignmentId, studentId);
      return grade.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
   }
}