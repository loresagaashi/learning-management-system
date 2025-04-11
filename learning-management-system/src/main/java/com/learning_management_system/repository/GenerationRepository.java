package com.learning_management_system.repository;

import com.learning_management_system.model.Generation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationRepository extends JpaRepository<Generation, Long> {
}