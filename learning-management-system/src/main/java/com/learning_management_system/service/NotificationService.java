package com.learning_management_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Log;
import com.learning_management_system.model.Material;
import com.learning_management_system.model.Notification;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.NotificationRepository;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;

@Service
public class NotificationService extends BasicMongoServiceOperations<NotificationRepository, Notification>{
@Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    public NotificationService(NotificationRepository repository){
        super(repository);
    }
       public List<Notification> findAllWithStudentAndProfessorNames() {
        return notificationRepository.findAll().stream().peek(notification -> {
            Student student = studentRepository.findById(notification.getStudentId()).orElse(null);
            Professor professor = professorRepository.findById(notification.getProfessorId()).orElse(null);
            notification.setStudent(student);
            notification.setProfessor(professor);
        }).collect(Collectors.toList());
    }    

    public Notification saveNotificationWithStudentAndProfessor(Notification notification) {
        if (notification.getStudentId() != null) {
            studentRepository.findById(notification.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        }
    
        if (notification.getProfessorId() != null) {
            professorRepository.findById(notification.getProfessorId())
                .orElseThrow(() -> new RuntimeException("Professor not found"));
        }
    
        return notificationRepository.save(notification);
    }
}