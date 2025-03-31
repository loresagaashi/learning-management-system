package com.learning_management_system.service;

import com.learning_management_system.data.professor.ProfessorSearchDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
import com.learning_management_system.model.Professor;
import com.learning_management_system.repository.ProfessorRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
public class ProfessorService extends BasicServiceOperations<ProfessorRepository, Professor>{

   private final PasswordEncoder passwordEncoder;
   private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository repository, PasswordEncoder passwordEncoder, ProfessorRepository professorRepository) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.professorRepository = professorRepository;
    }
    @Override
  public Professor save(Professor entity) {
    if (entity.getId() == null) {
       entity.setPassword(passwordEncoder.encode(entity.getPassword()));
    } else {
        Professor user = repository.findById(entity.getId())
          .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
      entity.setPassword(user.getPassword());
    }

    return super.save(entity);
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