package com.learning_management_system.data.student;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentSearchDTO {
    private Long id;
    private String name;
    private String email;
}
