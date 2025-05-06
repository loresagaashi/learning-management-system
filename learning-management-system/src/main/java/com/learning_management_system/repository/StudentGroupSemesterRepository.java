package com.learning_management_system.repository;

import com.learning_management_system.model.Semester;
import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.model.StudentGroupSemester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentGroupSemesterRepository extends JpaRepository<StudentGroupSemester, Long> {

    Optional<StudentGroupSemester> findByGroupAndSemester(StudentGroup group, Semester semester);

}
