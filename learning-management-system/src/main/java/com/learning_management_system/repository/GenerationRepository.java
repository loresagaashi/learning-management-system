package com.learning_management_system.repository;

import com.learning_management_system.enums.DegreeType;
import com.learning_management_system.model.Generation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationRepository extends JpaRepository<Generation, Long> {
     List<Generation> findByDegreeType(DegreeType degreeType);

     Generation findByName(String name);
}