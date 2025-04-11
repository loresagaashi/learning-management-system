package com.learning_management_system.repository;

import com.learning_management_system.model.StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentGroupRepository extends JpaRepository<StudentGroup, Long> {

    @Query("SELECT COUNT(s) FROM Student s WHERE s.group.id = :groupId")
    int countStudentsInGroup(@Param("groupId") Long groupId);

}
