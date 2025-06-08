package com.learning_management_system.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Lecture;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long>{
    List<Lecture> findByCourseId(Long courseId);  // Get lectures for a specific course
}

