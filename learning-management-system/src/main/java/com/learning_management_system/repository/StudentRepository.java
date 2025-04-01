package com.learning_management_system.repository;

import java.util.List;
import java.util.Optional;

import com.learning_management_system.data.student.StudentSearchDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student,Long>{
    Optional<Student> findByEmail(String email);

    Optional<Student> findByStudentId(Long studentId);

    @Query("""
    SELECT new com.learning_management_system.data.student.StudentSearchDTO(s.id, CONCAT(s.firstName, ' ', s.lastName), s.email)
    FROM Student s
    WHERE (:search IS NULL OR TRIM(:search) = '' OR LOWER(s.firstName) LIKE LOWER(CONCAT('%', :search, '%')) 
    OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :search, '%')))
    """)
    List<StudentSearchDTO> searchStudents(@Param("search") String search);

}
