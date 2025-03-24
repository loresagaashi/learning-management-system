package com.learning_management_system.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService extends BasicServiceOperations<StudentRepository, Student> {

     private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
    }
    @Override
  public Student save(Student entity) {
    if (entity.getId() == null) {
       entity.setPassword(passwordEncoder.encode(entity.getPassword()));
    } else {
        Student user = repository.findById(entity.getId())
          .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
      entity.setPassword(user.getPassword());
    }

    return super.save(entity);
  }

  @Override
  protected void validateEntity(Student entity) throws EntityValidationException {

    Student existingStudent = repository.findByEmail(entity.getEmail()).orElse(null);

    if (existingStudent != null && !existingStudent.getId().equals(entity.getId())) {
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("DuplicateEmail")
          .fieldName("email")
          .rejectedValue(entity.getEmail())
          .message("This email already exists")
          .build()
      );
    }
  }

    public Student login(String email, String password) {
        Student student = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!student.getPassword().equals(password)) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return student;
    }
    
}

