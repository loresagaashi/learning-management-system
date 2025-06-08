package com.learning_management_system.repository;

import com.learning_management_system.data.exam.ExamApplicationInfoDTO;
import com.learning_management_system.data.exam.PassedExamDTO;
import com.learning_management_system.data.exam.UnmarkedExamDTO;
import com.learning_management_system.enums.ExamStatus;
import com.learning_management_system.model.ExamApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamApplicationRepository extends JpaRepository<ExamApplication, Long> {

    Optional<ExamApplication> findByExamIdAndStudentId(Long examId, Long studentId);

    @Query("SELECT new com.learning_management_system.data.exam.PassedExamDTO(e.course.name, ea.grade) " +
            "FROM ExamApplication ea " +
            "JOIN ea.exam e " +
            "WHERE ea.student.id = :studentId AND ea.status = 'PASSED'")
    List<PassedExamDTO> findPassedExamsByStudentId(@Param("studentId") Long studentId);

    @Query("""
                SELECT new com.learning_management_system.data.exam.UnmarkedExamDTO(
                    e.id,
                    e.title,
                    c.name,
                    e.dateTime,
                    e.location,
                    ea.grade
                )
                FROM ExamApplication ea
                JOIN ea.exam e
                JOIN e.course c
                WHERE ea.student.id = :studentId
                  AND ea.grade IS NULL
            """)
    List<UnmarkedExamDTO> findUnmarkedExamsByStudentId(@Param("studentId") Long studentId);


    @Query("""
                SELECT new com.learning_management_system.data.exam.ExamApplicationInfoDTO(
                    e.id,
                    e.title,
                    c.name,
                    CONCAT(s.firstName, ' ', s.lastName),
                    ea.grade,
                    ea.status,
                    ea.student.id
                )
                FROM ExamApplication ea
                JOIN ea.exam e
                JOIN e.course c
                JOIN ea.student s
                WHERE e.professor.id = :professorId
            """)
    List<ExamApplicationInfoDTO> findAllExamApplicationsByProfessorId(@Param("professorId") Long professorId);

}
