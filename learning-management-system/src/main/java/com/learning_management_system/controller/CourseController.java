package com.learning_management_system.controller;

import com.learning_management_system.data.course.CourseDTO;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Course;
import com.learning_management_system.service.CourseService;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController extends BasicControllerOperations<CourseService,Course>{

    public CourseController(CourseService service){
        super(service);
    }

    @GetMapping("/{courseId}/students")
    public List<Student> getStudentsByCourse(@PathVariable Long courseId) {
        return service.getStudentsByCourse(courseId);
    }

    @GetMapping("/{courseId}/lectures")
    public List<Lecture> getLecturesByCourse(@PathVariable Long courseId) {
        return service.getLecturesByCourse(courseId);
    }

    @GetMapping("/unpassed/{studentId}")
    public ResponseEntity<List<CourseDTO>> getUnpassedCourses(@PathVariable Long studentId) {
        List<CourseDTO> result = service.getUnpassedCourses(studentId);
        return ResponseEntity.ok(result);
    }
    
}