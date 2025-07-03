package com.learning_management_system.data.semester;

import com.learning_management_system.data.generation.GenerationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SemesterDTO1 {
    private Long id;
    private String name;
    private String season;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private GenerationDTO generation;
    private Boolean active;


    public SemesterDTO1(Long id, String name, String season,
                       LocalDateTime startDate, LocalDateTime endDate,
                       Long generationId, String generationName, Boolean active) {
        this.id = id;
        this.name = name;
        this.season = season;
        this.startDate = startDate;
        this.endDate = endDate;
        this.generation = new GenerationDTO(generationId, generationName);
        this.active = active;
    }
}
