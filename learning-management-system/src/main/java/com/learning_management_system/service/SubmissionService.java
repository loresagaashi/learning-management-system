package com.learning_management_system.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learning_management_system.model.Submission;
import com.learning_management_system.model.Assignment;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.SubmissionRepository;
import com.learning_management_system.repository.AssignmentRepository;
import com.learning_management_system.repository.StudentRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class SubmissionService extends BasicServiceOperations<SubmissionRepository, Submission> {

   private final AssignmentRepository assignmentRepository;
   private final StudentRepository studentRepository;

   public SubmissionService(SubmissionRepository repository, AssignmentRepository assignmentRepository, 
                          StudentRepository studentRepository) {
      super(repository);
      this.assignmentRepository = assignmentRepository;
      this.studentRepository = studentRepository;
   }

   public List<Submission> findByStudentId(Long studentId) {
      return repository.findByStudentId(studentId);
   }

   public Submission uploadSubmission(MultipartFile file, Long assignmentId, Long studentId) throws IOException {
      // Find assignment and student
      Assignment assignment = assignmentRepository.findById(assignmentId)
         .orElseThrow(() -> new RuntimeException("Assignment not found with ID: " + assignmentId));
      
      Student student = studentRepository.findById(studentId)
         .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

      // Check if submission already exists for this student and assignment
      Optional<Submission> existingSubmission = repository.findByAssignmentIdAndStudentId(assignmentId, studentId);
      if (existingSubmission.isPresent()) {
         throw new RuntimeException("Submission already exists for this assignment");
      }

      // Generate unique filename
      String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

      // Save file to submissions directory
      Path uploadPath = Paths.get("uploads/submissions");
      if (!Files.exists(uploadPath)) {
         Files.createDirectories(uploadPath);
      }
      Path filePath = uploadPath.resolve(fileName);
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

      // Create submission record
      Submission submission = new Submission();
      submission.setAssignment(assignment);
      submission.setStudent(student);
      submission.setSubmissionDate(LocalDate.now());
      submission.setFileUrl("/uploads/submissions/" + fileName);

      return repository.save(submission);
   }
}
