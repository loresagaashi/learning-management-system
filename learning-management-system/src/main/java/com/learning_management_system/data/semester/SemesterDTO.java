package com.learning_management_system.data.semester;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SemesterDTO {
    private Long id;
    private String name;
    private String season;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String generationName;
    private Boolean active;

}
