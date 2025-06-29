package com.learning_management_system.data.assignment;

import lombok.Data;

@Data
public class GradeAssignmentRequest {
    private Long assignmentId;
    private Long studentId;
    private Integer grade;
} 