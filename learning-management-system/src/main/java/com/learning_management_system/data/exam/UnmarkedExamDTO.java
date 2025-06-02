package com.learning_management_system.data.exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnmarkedExamDTO {
    private Long examId;
    private String examTitle;
    private String courseName;
    private LocalDateTime dateTime;
    private String location;
    private Double grade;
}