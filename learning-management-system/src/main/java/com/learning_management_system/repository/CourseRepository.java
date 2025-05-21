package com.learning_management_system.repository;

// import java.util.Optional;

import com.learning_management_system.data.course.CourseDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long>{
    List<Course> findByProfessorId(Long professorId);

    @Query("""
                SELECT new com.learning_management_system.data.course.CourseDTO(
                    c.id,
                    c.name,
                    c.description,
                    e.id,
                    e.professor.firstName
                )
                FROM Schedule sc
                JOIN sc.groupSemester gs
                JOIN gs.group g
                JOIN Student s ON s.group = g
                JOIN sc.course c
                JOIN Exam e ON e.course = c
                WHERE s.id = :studentId
                  AND (
                    NOT EXISTS (
                      SELECT ea FROM ExamApplication ea
                      WHERE ea.exam.course = c
                        AND ea.student.id = :studentId
                        AND ea.status = 'PASSED'
                    )
                  )
            """)
    List<CourseDTO> findUnpassedOrUnattemptedCoursesByStudentId(@Param("studentId") Long studentId);

}
