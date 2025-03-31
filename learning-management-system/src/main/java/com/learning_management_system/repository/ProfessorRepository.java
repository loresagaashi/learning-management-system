package com.learning_management_system.repository;

import com.learning_management_system.data.professor.ProfessorSearchDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import com.learning_management_system.model.Professor;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByEmail(String email);

    @Query("""
   SELECT new com.learning_management_system.data.professor.ProfessorSearchDTO(
       p.id, CONCAT(p.firstName, ' ', p.lastName), p.email)
   FROM Professor p
   WHERE (COALESCE(:search, '') = '' OR LOWER(p.firstName) LIKE LOWER(CONCAT('%', :search, '%')) 
   OR LOWER(p.lastName) LIKE LOWER(CONCAT('%', :search, '%')))
   """)
    List<ProfessorSearchDTO> searchProfessors(@Param("search") String search);


}
