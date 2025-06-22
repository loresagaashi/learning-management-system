package com.learning_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Course;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.repository.CourseRepository;
import com.learning_management_system.repository.LectureRepository;

@Service
public class LectureService extends BasicServiceOperations<LectureRepository, Lecture>{

    private final CourseRepository courseRepository;

    public LectureService(LectureRepository repository, CourseRepository courseRepository){
        super(repository);
        this.courseRepository = courseRepository;
    }
    public List<Lecture> findByCourseId(Long courseId) {
        return repository.findByCourseId(courseId);
    }
    
    @Override
    public Lecture save(Lecture lecture) {
        // Ensure the course is properly loaded from the database
        if (lecture.getCourse() != null && lecture.getCourse().getId() != null) {
            Course course = courseRepository.findById(lecture.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + lecture.getCourse().getId()));
            lecture.setCourse(course);
        }
        return super.save(lecture);
    }
}    

