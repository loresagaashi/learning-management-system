package com.learning_management_system.data.schedule;

import com.learning_management_system.enums.DayOfWeek;
import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor

public class ScheduleDTO {
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String courseName;
    private String professorName;
    private String room;

}