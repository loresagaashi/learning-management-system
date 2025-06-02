package com.learning_management_system.repository;

import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

    @Query("SELECT new com.learning_management_system.data.semester.SemesterDTO(s.id,s.name, s.season, s.startDate, s.endDate,s.generation.name,s.active) " +
            "FROM Semester s WHERE s.generation.name = :generationName and s.active=true ")
    List<SemesterDTO> findSemestersByGenerationName(@Param("generationName") String generationName);

    @Query("SELECT new com.learning_management_system.data.semester.SemesterDTO(" +
            "s.id, s.name, s.season, s.startDate, s.endDate, g.name ,s.active) " +
            "FROM Semester s JOIN s.generation g order by s.id desc ")
    List<SemesterDTO> findAllWithGenerationName();

    long countByGenerationAndActiveIsTrue(Generation generation);

}
