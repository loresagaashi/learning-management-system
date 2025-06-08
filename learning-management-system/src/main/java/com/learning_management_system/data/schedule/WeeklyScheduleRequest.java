package com.learning_management_system.data.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class WeeklyScheduleRequest {
    private Long groupId;
    private Long semesterId;
    private List<ScheduleEntryRequest> scheduleEntries;
}