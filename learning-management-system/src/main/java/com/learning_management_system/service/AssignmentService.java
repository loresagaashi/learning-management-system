package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Assignment;
import com.learning_management_system.model.Grade;
import com.learning_management_system.model.Submission;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.AssignmentRepository;
import com.learning_management_system.repository.GradeRepository;
import com.learning_management_system.repository.SubmissionRepository;
import com.learning_management_system.repository.StudentRepository;
import com.learning_management_system.data.assignment.AssignmentGradeDTO;
import com.learning_management_system.data.assignment.GradeAssignmentRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AssignmentService extends BasicServiceOperations<AssignmentRepository, Assignment> {

   private final GradeRepository gradeRepository;
   private final SubmissionRepository submissionRepository;
   private final StudentRepository studentRepository;

   public AssignmentService(AssignmentRepository repository, GradeRepository gradeRepository, 
                          SubmissionRepository submissionRepository, StudentRepository studentRepository) {
      super(repository);
      this.gradeRepository = gradeRepository;
      this.submissionRepository = submissionRepository;
      this.studentRepository = studentRepository;
   }

   public List<Assignment> findByCourseId(Long courseId) {
      return repository.findByCourseId(courseId);
   }

   /**
    * Get all submissions for an assignment with grading information
    */
   public List<AssignmentGradeDTO> getAssignmentSubmissionsForGrading(Long assignmentId) {
      List<Submission> submissions = submissionRepository.findByAssignmentId(assignmentId);
      
      return submissions.stream().map(submission -> {
         AssignmentGradeDTO dto = new AssignmentGradeDTO();
         dto.setAssignmentId(assignmentId);
         dto.setAssignmentTitle(submission.getAssignment().getTitle());
         dto.setCourseName(submission.getAssignment().getCourse().getName());
         dto.setStudentId(submission.getStudent().getId());
         dto.setStudentName(submission.getStudent().getFirstName() + " " + submission.getStudent().getLastName());
         dto.setStudentEmail(submission.getStudent().getEmail());
         dto.setSubmissionDate(submission.getSubmissionDate());
         dto.setSubmissionFileUrl(submission.getFileUrl());
         
         // Check if already graded
         Optional<Grade> existingGrade = gradeRepository.findByAssignmentIdAndStudentId(assignmentId, submission.getStudent().getId());
         if (existingGrade.isPresent()) {
            dto.setGrade(existingGrade.get().getGrade());
            dto.setGraded(true);
            dto.setGradedDate(existingGrade.get().getUpdatedOn().toLocalDate());
         } else {
            dto.setGraded(false);
         }
         
         return dto;
      }).collect(Collectors.toList());
   }

   /**
    * Grade a student's assignment submission
    */
   public Grade gradeAssignment(GradeAssignmentRequest request) {
      // Verify assignment exists
      Assignment assignment = repository.findById(request.getAssignmentId())
         .orElseThrow(() -> new RuntimeException("Assignment not found"));
      
      // Verify student exists
      Student student = studentRepository.findById(request.getStudentId())
         .orElseThrow(() -> new RuntimeException("Student not found"));
      
      // Verify submission exists
      Submission submission = submissionRepository.findByAssignmentIdAndStudentId(
         request.getAssignmentId(), request.getStudentId())
         .orElseThrow(() -> new RuntimeException("Submission not found for this assignment and student"));
      
      // Check if already graded
      Optional<Grade> existingGrade = gradeRepository.findByAssignmentIdAndStudentId(
         request.getAssignmentId(), request.getStudentId());
      
      Grade grade;
      if (existingGrade.isPresent()) {
         // Update existing grade
         grade = existingGrade.get();
         grade.setGrade(request.getGrade());
      } else {
         // Create new grade
         grade = new Grade();
         grade.setAssignment(assignment);
         grade.setStudent(student);
         grade.setGrade(request.getGrade());
      }
      
      return gradeRepository.save(grade);
   }

   /**
    * Get grades for a specific assignment
    */
   public List<Grade> getAssignmentGrades(Long assignmentId) {
      return gradeRepository.findByAssignmentId(assignmentId);
   }

   /**
    * Get grade for a specific student's assignment
    */
   public Optional<Grade> getStudentAssignmentGrade(Long assignmentId, Long studentId) {
      return gradeRepository.findByAssignmentIdAndStudentId(assignmentId, studentId);
   }
}
