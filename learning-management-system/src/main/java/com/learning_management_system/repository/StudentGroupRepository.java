package com.learning_management_system.repository;

import com.learning_management_system.data.studentGroup.StudentGroup1;
import com.learning_management_system.data.studentGroup.StudentGroupDTO;
import com.learning_management_system.model.StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentGroupRepository extends JpaRepository<StudentGroup, Long> {

    @Query("SELECT COUNT(s) FROM Student s WHERE s.group.id = :groupId")
    int countStudentsInGroup(@Param("groupId") Long groupId);

    @Query("SELECT new com.learning_management_system.data.studentGroup.StudentGroupDTO(g.id, g.name) " +
            "FROM StudentGroup g " +
            "WHERE g.generation.name = :generationName AND g.semester.id = :semesterId")
    List<StudentGroupDTO> findGroupsByGenerationNameAndSemesterId(@Param("generationName") String generationName,
                                                                  @Param("semesterId") Long semesterId);

    @Query("SELECT new com.learning_management_system.data.studentGroup.StudentGroupDTO(g.id, g.name) " +
            "FROM StudentGroup g " +
            "WHERE g.generation.name = :generationName")
    List<StudentGroupDTO> findGroupsByGenerationName(@Param("generationName") String generationName);

    @Query("SELECT new com.learning_management_system.data.studentGroup.StudentGroup1(" +
            "sg.id, sg.name, sg.capacity, " +
            "g.id, g.name, " +
            "s.id, s.name, " +
            "NULL)" +
            " FROM StudentGroup sg " +
            "JOIN sg.generation g " +
            "LEFT JOIN sg.semester s")
    List<StudentGroup1> findAllGroupsWithoutStudents();


    @Query("SELECT s.id FROM Student s WHERE s.group.id = :groupId")
    List<Long> findStudentIdsByGroupId(@Param("groupId") Long groupId);

}
