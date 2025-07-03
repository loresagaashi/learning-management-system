package com.learning_management_system.data.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long courseId;
    private String name;
    private String description;
    private Long examId;
    private LocalDateTime  dateTime;
    private String professorName;
}

