package com.learning_management_system.service;

import com.learning_management_system.data.course.CourseDTO;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Course;
import com.learning_management_system.repository.CourseRepository;

import java.util.List;

@Service
public class CourseService extends BasicServiceOperations<CourseRepository, Course>{

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;

    public CourseService(CourseRepository repository){
        super(repository);
    }

    public Course getCourseWithLectures(Long courseId) {
        return courseRepository.findById(courseId).orElseThrow();
    }
    public List<Student> getStudentsByCourse(Long courseId) {
        return studentRepository.findByCoursesId(courseId); // Assuming relation exists
    }
    public List<Lecture> getLecturesByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return course.getLectures(); // assuming the Course entity has a getLectures() method
    }

       public List<Course> getCoursesByProfessorId(Long professorId) {
        return courseRepository.findByProfessorId(professorId);
    }

    public List<CourseDTO> getUnpassedCourses(Long studentId) {
        return courseRepository.findUnpassedCoursesByStudentId(studentId);
    }
}
