package com.learning_management_system.service;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Log;
import com.learning_management_system.model.Material;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.LogRepository;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService extends BasicMongoServiceOperations<LogRepository, Log>{
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private LogRepository logRepository;
    protected LogService(LogRepository repository) {
        super(repository);
    }
    public List<Log> findAllWithStudentAndProfessorNames() {
        return logRepository.findAll().stream().peek(log -> {
            Student student = studentRepository.findById(log.getStudentId()).orElse(null);
            Professor professor = professorRepository.findById(log.getProfessorId()).orElse(null);
            log.setStudent(student);
            log.setProfessor(professor);
        }).collect(Collectors.toList());
    }    

    public Log saveLogWithStudentAndProfessor(Log log) {
        if (log.getStudentId() != null) {
            studentRepository.findById(log.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        }
    
        if (log.getProfessorId() != null) {
            professorRepository.findById(log.getProfessorId())
                .orElseThrow(() -> new RuntimeException("Professor not found"));
        }
    
        return logRepository.save(log);
    }
    
}