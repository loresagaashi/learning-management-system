package com.learning_management_system.controller;

import com.learning_management_system.data.course.CourseDTO;
import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.CourseRepository;
import com.learning_management_system.repository.SemesterRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Course;
import com.learning_management_system.model.Generation;
import com.learning_management_system.service.CourseService;
import com.learning_management_system.service.GenerationService;
import com.learning_management_system.service.SemesterService;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController extends BasicControllerOperations<CourseService,Course>{

    private final CourseRepository courseRepository;
    private final SemesterService semesterService;
    private final CourseService courseService;
    
    public CourseController(CourseService service,CourseRepository courseRepository,SemesterService semesterService){
        super(service); 
        this.courseService = service;
        this.courseRepository = courseRepository;
        this.semesterService = semesterService;
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

        @GetMapping("/by-semester")
    public ResponseEntity<List<Course>> getSemestersByGeneration(@RequestParam String semesterName) {
        Semester semester =    semesterService.findByName(semesterName);
        if (semester == null) {
            return ResponseEntity.notFound().build(); // Or handle as appropriate
        }
        List<Course> courses = courseService.getCoursesBySemesterName(semester);
        return ResponseEntity.ok(courses);
    }
    
}