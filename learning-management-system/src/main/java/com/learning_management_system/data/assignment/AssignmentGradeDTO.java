package com.learning_management_system.data.assignment;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AssignmentGradeDTO {
    private Long assignmentId;
    private String assignmentTitle;
    private String courseName;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private LocalDate submissionDate;
    private String submissionFileUrl;
    private Integer grade;
    private boolean isGraded;
    private LocalDate gradedDate;
} 