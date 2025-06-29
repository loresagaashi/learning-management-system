package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Submission;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission,Long>{
    
    List<Submission> findByAssignmentId(Long assignmentId);
    
    Optional<Submission> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
    
    List<Submission> findByAssignmentIdAndStudentIdIn(Long assignmentId, List<Long> studentIds);
    
    List<Submission> findByStudentId(Long studentId);
}
