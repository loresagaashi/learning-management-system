package com.learning_management_system.data.studentGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import com.learning_management_system.data.generation.GenerationDTO;
import com.learning_management_system.data.semester.SemesterDTO;

import java.time.LocalDateTime;

@Data
public class StudentGroup1 {
    private Long id;
    private String name;
    private Integer capacity;
    private GenerationDTO generation;
    private SemesterDTO semester;

    public StudentGroup1(Long id, String name, Integer capacity,
                         Long generationId, String generationName,
                         Long semesterId, String semesterName, String season,
                         LocalDateTime startDate, LocalDateTime endDate,
                         String semesterGenerationName, Boolean active) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.generation = new GenerationDTO(generationId, generationName);
        if (semesterId != null) {
            this.semester = new SemesterDTO(semesterId, semesterName, season, startDate, endDate, semesterGenerationName, active);
        }
    }
}
