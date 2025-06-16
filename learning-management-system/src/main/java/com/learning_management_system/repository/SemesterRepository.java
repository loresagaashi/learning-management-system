package com.learning_management_system.repository;

import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.data.semester.SemesterDTO1;
import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

        @Query("SELECT new com.learning_management_system.data.semester.SemesterDTO(s.id,s.name, s.season, s.startDate, s.endDate,s.generation.name,s.active) " +
                        "FROM Semester s WHERE s.generation = :generation and s.active=true ")
        List<SemesterDTO> findSemestersByGenerationNameGet(@Param("generation") Generation generation);

        @Query("SELECT new com.learning_management_system.data.semester.SemesterDTO(s.id,s.name, s.season, s.startDate, s.endDate,s.generation.name,s.active) " +
        "FROM Semester s WHERE s.generation.name = :generationName and s.active=true ")
List<SemesterDTO> findSemestersByGenerationName(@Param("generationName") String generationName);

        @Query("SELECT new com.learning_management_system.data.semester.SemesterDTO1(" +
                "s.id, s.name, s.season, s.startDate, s.endDate, " +
                "g.id, g.name, s.active) " +
                "FROM Semester s JOIN s.generation g ORDER BY s.id DESC")
        List<SemesterDTO1> findAllWithGenerationName();


        long countByGenerationAndActiveIsTrue(Generation generation);

        @Query("SELECT s FROM Semester s WHERE s.generation.id = :generationId")
        List<Semester> findByGenerationId(@Param("generationId") Long generationId);

        Semester findByName(String name);
}
