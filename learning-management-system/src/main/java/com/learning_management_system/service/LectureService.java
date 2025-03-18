package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.repository.LectureRepository;

@Service
public class LectureService extends BasicServiceOperations<LectureRepository, Lecture>{

    public LectureService(LectureRepository repository){
        super(repository);
    }
}
