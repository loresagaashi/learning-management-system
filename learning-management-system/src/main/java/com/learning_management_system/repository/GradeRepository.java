package com.learning_management_system.repository;

// import java.util.Optional;

import com.learning_management_system.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Grade;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudent(Student student);
}
