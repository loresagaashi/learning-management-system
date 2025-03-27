package com.learning_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.City;

public interface CityRepository extends JpaRepository<City, Long>{
}
