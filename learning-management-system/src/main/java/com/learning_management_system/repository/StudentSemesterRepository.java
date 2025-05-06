package com.learning_management_system.repository;

import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.model.StudentSemester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentSemesterRepository extends JpaRepository<StudentSemester, Long> {

    boolean existsByStudentAndSemester(Student student, Semester semester);

    boolean existsByStudentAndSemester_Generation(Student student, Generation generation);
    Optional<StudentSemester> findTopByStudentAndSemester_GenerationOrderByRegistrationDateDesc(Student student, Generation generation);

    Optional<StudentSemester> findTopByStudentOrderByRegistrationDateDesc(Student student);

}
