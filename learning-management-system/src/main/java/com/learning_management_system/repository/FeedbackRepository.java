package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
}
