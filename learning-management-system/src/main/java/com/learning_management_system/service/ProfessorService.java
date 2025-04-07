package com.learning_management_system.service;

import com.learning_management_system.data.professor.ProfessorSearchDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
import com.learning_management_system.model.Professor;
import com.learning_management_system.repository.ProfessorRepository;

import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.util.List;

@Service
public class ProfessorService extends BasicServiceOperations<ProfessorRepository, Professor>{

   private final PasswordEncoder passwordEncoder;
   private final ProfessorRepository professorRepository;
   private final EmailService emailService;

    public ProfessorService(ProfessorRepository repository, PasswordEncoder passwordEncoder, ProfessorRepository professorRepository, EmailService emailService) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.professorRepository = professorRepository;
        this.emailService = emailService;
    }
    @Override
    public Professor save(Professor entity) {
        boolean isNew = (entity.getId() == null);

        if (isNew) {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        } else {
            Professor user = repository.findById(entity.getId())
                    .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
            if (!passwordEncoder.matches(entity.getPassword(), user.getPassword())) {
                entity.setPassword(passwordEncoder.encode(entity.getPassword()));
            } else {
                entity.setPassword(user.getPassword());
            }
        }
        Professor savedProfessor = super.save(entity);

        // Send welcome email only for new professors
        if (isNew) {
            try {
               emailService.sendWelcomeEmailToProfessor(savedProfessor.getId());
            } catch (MessagingException | IOException e) {
                throw new RuntimeException("Failed to send welcome email", e);
            }
        }

        return savedProfessor;
    }


    @Override
  protected void validateEntity(Professor entity) throws EntityValidationException {

    Professor existingProfessor= repository.findByEmail(entity.getEmail()).orElse(null);

    if (existingProfessor != null && !existingProfessor.getId().equals(entity.getId())) {
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("DuplicateEmail")
          .fieldName("email")
          .rejectedValue(entity.getEmail())
          .message("This email already exists")
          .build()
      );
    }
  }

    public Professor login(String email, String password) {
        Professor professor = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!professor.getPassword().matches(password)) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return professor;
    }

    public List<ProfessorSearchDTO> getProfessors(String search) {
        return professorRepository.searchProfessors(search);
    }
}