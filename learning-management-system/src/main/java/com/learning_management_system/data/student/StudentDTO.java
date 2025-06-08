package com.learning_management_system.data.student;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String fullName;
    private String email;
    private Long generationId;
    private String generationName;
    private Long groupId;
    private String groupName;
}
