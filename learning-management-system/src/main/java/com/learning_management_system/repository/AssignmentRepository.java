package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Assignment;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
    
    List<Assignment> findByCourseId(Long courseId);
}

