package com.learning_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.repository.LectureRepository;

@Service
public class LectureService extends BasicServiceOperations<LectureRepository, Lecture>{

    public LectureService(LectureRepository repository){
        super(repository);
    }
    
    @Override
    public Lecture save(Lecture lecture) {
        System.out.println("LectureService.save() called with lecture: " + lecture);
        System.out.println("Lecture ID: " + lecture.getId());
        System.out.println("Lecture name: " + lecture.getName());
        System.out.println("Lecture course: " + (lecture.getCourse() != null ? lecture.getCourse().getId() : "null"));
        
        try {
            Lecture savedLecture = super.save(lecture);
            System.out.println("Lecture saved successfully: " + savedLecture.getId());
            return savedLecture;
        } catch (Exception e) {
            System.err.println("Error saving lecture: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    public List<Lecture> findByCourseId(Long courseId) {
        return repository.findByCourseId(courseId);
    }
    
}