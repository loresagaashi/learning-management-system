package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Submission;
import com.learning_management_system.repository.SubmissionRepository;

import java.util.List;

@Service
public class SubmissionService extends BasicServiceOperations<SubmissionRepository, Submission> {

   public SubmissionService(SubmissionRepository repository) {
      super(repository);
   }

   public List<Submission> findByStudentId(Long studentId) {
      return repository.findByStudentId(studentId);
   }
}
