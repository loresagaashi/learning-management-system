package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Assignment;
import com.learning_management_system.repository.AssignmentRepository;

@Service
public class AssignmentService extends BasicServiceOperations<AssignmentRepository, Assignment> {

   public AssignmentService(AssignmentRepository repository) {
      super(repository);
   }
}
