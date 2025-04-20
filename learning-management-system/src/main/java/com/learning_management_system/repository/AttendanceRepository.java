package com.learning_management_system.repository;

import com.learning_management_system.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByLectureId(Long lectureId); // Get attendance records for a specific lecture
}
