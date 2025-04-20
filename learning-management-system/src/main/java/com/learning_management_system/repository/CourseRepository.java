package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long>{
    List<Course> findByProfessorId(Long professorId);
}
