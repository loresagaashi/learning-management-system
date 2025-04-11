package com.learning_management_system.data.student;

import lombok.Data;

@Data
public class AssignStudentToGroupRequest {
    private Long studentId;
    private Long groupId;
}
