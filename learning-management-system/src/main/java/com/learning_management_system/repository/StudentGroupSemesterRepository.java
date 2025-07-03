package com.learning_management_system.repository;

import com.learning_management_system.model.Semester;
import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.model.StudentGroupSemester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentGroupSemesterRepository extends JpaRepository<StudentGroupSemester, Long> {

    Optional<StudentGroupSemester> findByGroupAndSemester(StudentGroup group, Semester semester);

    @Query("SELECT sgs FROM StudentGroupSemester sgs WHERE sgs.group = :group ORDER BY sgs.semester.startDate DESC")
    Optional<StudentGroupSemester> findTopByGroupOrderBySemester_RegistrationDateDesc(@Param("group") StudentGroup group);

    @Query("SELECT sgs FROM StudentGroupSemester sgs WHERE sgs.group = :group ORDER BY sgs.semester.startDate DESC")
    List<StudentGroupSemester> findLatestByGroup(@Param("group") StudentGroup group);

}
