package com.learning_management_system.controller;

import com.learning_management_system.data.schedule.ScheduleDTO;
import com.learning_management_system.data.schedule.WeeklyScheduleRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.learning_management_system.model.Schedule;
import com.learning_management_system.service.ScheduleService;

import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ScheduleController extends BasicControllerOperations<ScheduleService, Schedule>{

    private final ScheduleService scheduleService;

    public ScheduleController (ScheduleService service, ScheduleService scheduleService){
        super(service);
        this.scheduleService = scheduleService;
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<ScheduleDTO>> getWeeklySchedule(
            @RequestParam Long groupId,
            @RequestParam Long semesterId
    ) {
        return ResponseEntity.ok(scheduleService.getWeeklySchedule(groupId, semesterId));
    }

    @PostMapping("/weekly")
    public ResponseEntity<String> createWeeklySchedule(@RequestBody WeeklyScheduleRequest request) {
        scheduleService.createWeeklySchedule(request);
        return ResponseEntity.ok("Weekly schedule created successfully.");
    }

    @GetMapping("/students/{studentId}/schedule")
    public ResponseEntity<List<ScheduleDTO>> getScheduleForStudent(@PathVariable Long studentId) {
        List<ScheduleDTO> schedule = scheduleService.getScheduleForStudent(studentId);
        return ResponseEntity.ok(schedule);
    }


}
