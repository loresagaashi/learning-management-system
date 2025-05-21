package com.learning_management_system.data.exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassedExamDTO {
    private String courseName;
    private Double grade;
}