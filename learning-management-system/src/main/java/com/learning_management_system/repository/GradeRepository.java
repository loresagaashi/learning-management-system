package com.learning_management_system.repository;

// import java.util.Optional;

import com.learning_management_system.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Grade;

import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudent(Student student);
    List<Grade> findByStudentIdAndExamIsNotNull(Long studentId);
    
    List<Grade> findByAssignmentId(Long assignmentId);
    
    Optional<Grade> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
    
    boolean existsByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
}
