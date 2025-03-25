package com.learning_management_system.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Orientation;

public interface OrientationRepository extends JpaRepository<Orientation, Long> {
    Optional<Orientation> findByName(String name);
}