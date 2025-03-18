package com.learning_management_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Material;

public interface MaterialRepository extends JpaRepository<Material, Long>{
    Optional<Material> findByName(String name);
}

