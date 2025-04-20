package com.learning_management_system.controller;

import com.learning_management_system.model.Attendance;
import com.learning_management_system.model.Course;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController extends BasicControllerOperations<AttendanceService, Attendance>{

    public AttendanceController(AttendanceService service){
        super(service);
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return service.getAllCourses();
    }

    // 2. Get lectures for a specific course
    @GetMapping("/courses/{courseId}/lectures")
    public List<Lecture> getLecturesForCourse(@PathVariable Long courseId) {
        return service.getLecturesForCourse(courseId);
    }

    // 3. Record attendance
    @PostMapping("/record")
    public void recordAttendance(
            @RequestParam Long lectureId,
            @RequestParam List<Long> studentIds,
            @RequestParam boolean present
    ) {
        service.recordAttendance(lectureId, studentIds, present);
    }

}
