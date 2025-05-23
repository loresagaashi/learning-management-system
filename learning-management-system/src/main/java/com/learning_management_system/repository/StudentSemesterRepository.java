package com.learning_management_system.repository;

import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.model.StudentSemester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentSemesterRepository extends JpaRepository<StudentSemester, Long> {

    boolean existsByStudentAndSemester(Student student, Semester semester);

    boolean existsByStudentAndSemester_Generation(Student student, Generation generation);

    Optional<StudentSemester> findTopByStudentAndSemester_GenerationOrderByRegistrationDateDesc(Student student,
            Generation generation);

    Optional<StudentSemester> findTopByStudentOrderByRegistrationDateDesc(Student student);

    @Query("SELECT ss FROM StudentSemester ss JOIN FETCH ss.student JOIN FETCH ss.semester WHERE ss.student.id = :studentId")
    List<StudentSemester> findByStudentId(@Param("studentId") Long studentId);

}
