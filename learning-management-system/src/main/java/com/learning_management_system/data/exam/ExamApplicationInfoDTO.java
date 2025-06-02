package com.learning_management_system.data.exam;

import com.learning_management_system.enums.ExamStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamApplicationInfoDTO {
    private Long examId;
    private String examTitle;
    private String courseName;
    private String studentFullName;
    private Double grade;
    private ExamStatus status;
    private Long studentId;
}