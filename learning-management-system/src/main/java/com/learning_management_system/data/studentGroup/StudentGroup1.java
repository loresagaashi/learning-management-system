package com.learning_management_system.data.studentGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGroup1 {
    private Long id;
    private String name;
    private Integer capacity;
    private Long generationId;
    private String generationName;
    private Long semesterId;
    private String semesterName;
    private List<Long> studentIds;
}
