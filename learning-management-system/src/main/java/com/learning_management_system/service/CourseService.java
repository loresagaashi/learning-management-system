package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Course;
import com.learning_management_system.repository.CourseRepository;

@Service
public class CourseService extends BasicServiceOperations<CourseRepository, Course>{

    public CourseService(CourseRepository repository){
        super(repository);
    }
}
