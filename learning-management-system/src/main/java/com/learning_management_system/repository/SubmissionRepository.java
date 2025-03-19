package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Submission;

public interface SubmissionRepository extends JpaRepository<Submission,Long>{
    
}
