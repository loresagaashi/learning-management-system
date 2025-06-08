package com.learning_management_system.repository;

import com.learning_management_system.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long>{
}
