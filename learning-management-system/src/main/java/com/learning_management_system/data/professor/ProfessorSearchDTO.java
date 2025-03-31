package com.learning_management_system.data.professor;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfessorSearchDTO {
    private Long id;
    private String name;
    private String email;
}
