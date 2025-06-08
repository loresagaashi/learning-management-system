package com.learning_management_system.data.studentSemester;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentSemesterDTO {
    private Long semesterId;
    private String semesterName;
    private LocalDateTime registrationDate;
    private String season;
    private LocalDateTime startDate;
}
