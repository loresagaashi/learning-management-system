package com.learning_management_system.data.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.DayOfWeek;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ScheduleEntryRequest {
    private DayOfWeek dayOfWeek; // Enum: MONDAY, TUESDAY, ...
    private String startTime;    // format: "09:00"
    private String endTime;      // format: "10:30"
    private Long courseId;
    private Long professorId;
    private String room;
}