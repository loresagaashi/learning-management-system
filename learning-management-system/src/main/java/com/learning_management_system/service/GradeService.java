package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Grade;
import com.learning_management_system.repository.GradeRepository;

@Service
public class GradeService extends BasicServiceOperations<GradeRepository, Grade> {

   public GradeService(GradeRepository repository) {
      super(repository);
   }

}
