package com.learning_management_system.data.exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassedExamsResponseDTO {
    private List<PassedExamDTO> passedExams;
    private Double averageGrade;
}