package com.learning_management_system.repository;

// import java.util.Optional;

import com.learning_management_system.data.course.CourseDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.learning_management_system.model.Course;
import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByProfessorId(Long professorId);

    @Query("""
    SELECT c, p
    FROM Course c
    JOIN c.professor p
    WHERE c.id = :courseId
""")
List<Object[]> findCourseWithProfessors(@Param("courseId") Long courseId);

    @Query("SELECT DISTINCT c FROM Course c LEFT JOIN FETCH c.professor LEFT JOIN FETCH c.orientation LEFT JOIN FETCH c.semester")
    List<Course> findAllWithRelationships();

    @Query("SELECT DISTINCT new com.learning_management_system.data.course.CourseDTO(" +
           "c.id, " +
           "c.name, " +
           "c.description, " +
           "e.id, " +
           "e.professor.firstName) " +
           "FROM Student s " +
           "JOIN Schedule sc ON sc.groupSemester.group.id = s.group.id " +
           "JOIN Course c ON sc.course = c " +
           "JOIN Exam e ON e.course = c " +
           "WHERE s.id = :studentId " +
           "AND NOT EXISTS (" +
           "SELECT ea FROM ExamApplication ea " +
           "WHERE ea.exam.course = c " +
           "AND ea.student.id = :studentId " +
           "AND ea.status = 'PASSED'" +
           ")")
    List<CourseDTO> findUnpassedCoursesByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT c FROM Course c WHERE c.semester = :semester")
    List<Course> findCourseBySemesterName(@Param("semester") Semester semester);

}
