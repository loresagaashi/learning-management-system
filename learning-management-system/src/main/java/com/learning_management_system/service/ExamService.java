package com.learning_management_system.service;

import com.learning_management_system.model.Exam;
import com.learning_management_system.model.Grade;
import com.learning_management_system.repository.ExamRepository;
import com.learning_management_system.repository.GradeRepository;

public class ExamService extends BasicServiceOperations<ExamRepository, Exam> {

    public ExamService(ExamRepository repository) {
        super(repository);
    }
}
