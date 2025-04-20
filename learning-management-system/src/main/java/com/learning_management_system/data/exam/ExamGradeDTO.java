package com.learning_management_system.data.exam;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
public class ExamGradeDTO {
    private String examTitle;
    private LocalDateTime examDateTime;
    private String courseName;
    private Integer grade;

}
