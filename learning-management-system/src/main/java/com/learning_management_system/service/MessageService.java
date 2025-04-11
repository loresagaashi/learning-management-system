package com.learning_management_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Log;
import com.learning_management_system.model.Message;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.MessageRepository;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;

@Service
public class MessageService extends BasicMongoServiceOperations<MessageRepository, Message>{
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private MessageRepository messageRepository;
    public MessageService(MessageRepository repository){
        super(repository);
    }
    public List<Message> findAllWithStudentAndProfessorNames() {
        return messageRepository.findAll().stream().peek(message -> {
            Student student = studentRepository.findById(message.getStudentId()).orElse(null);
            Professor professor = professorRepository.findById(message.getProfessorId()).orElse(null);
            message.setStudent(student);
            message.setProfessor(professor);
        }).collect(Collectors.toList());
    }    

    public Message saveMessageWithStudentAndProfessor(Message message) {
        if (message.getStudentId() != null) {
            studentRepository.findById(message.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        }
    
        if (message.getProfessorId() != null) {
            professorRepository.findById(message.getProfessorId())
                .orElseThrow(() -> new RuntimeException("Professor not found"));
        }
    
        return messageRepository.save(message);
    }
}