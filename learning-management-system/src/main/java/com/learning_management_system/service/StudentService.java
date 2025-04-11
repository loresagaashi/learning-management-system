package com.learning_management_system.service;

import com.learning_management_system.data.student.StudentDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.repository.StudentGroupRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
// import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
// import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.util.List;

@Service
public class StudentService extends BasicServiceOperations<StudentRepository, Student> {

     private final PasswordEncoder passwordEncoder;
     private final StudentRepository studentRepository;
     private final EmailService emailService;
     private final StudentGroupRepository studentGroupRepository;



    public StudentService(StudentRepository repository, PasswordEncoder passwordEncoder, StudentRepository studentRepository, EmailService emailService, StudentGroupRepository studentGroupRepository) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.emailService = emailService;
        this.studentGroupRepository = studentGroupRepository;
    }
    @Override
    public Student save(Student entity) {
        boolean isNew = (entity.getId() == null);

        if (isNew) {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        } else {
            Student user = repository.findById(entity.getId())
                    .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
            if (!passwordEncoder.matches(entity.getPassword(), user.getPassword())) {
                entity.setPassword(passwordEncoder.encode(entity.getPassword()));
            } else {
                entity.setPassword(user.getPassword());
            }
        }

        Student savedStudent = super.save(entity);

        // Send welcome email only for new students
        if (isNew) {
            try {
                emailService.sendWelcomeEmailToStudent(savedStudent.getId());
            } catch (MessagingException | IOException e) {
                throw new RuntimeException("Failed to send welcome email", e);
            }
        }

        return savedStudent;
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
    private final BCryptPasswordEncoder passwordEncoder1 = new BCryptPasswordEncoder();

    public Student login(String email, String password) {
        Student student = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!passwordEncoder1.matches(password, student.getPassword())) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return student;
    }

    public List<StudentSearchDTO> getStudents(String search) {
        return studentRepository.searchStudents(search);
    }

    public Student assignToGroup(Long studentId, Long groupId) {
        Student student = repository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        StudentGroup group = studentGroupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        int currentSize = studentRepository.countStudentsInGroup(groupId);

        if (group.getCapacity() != null && currentSize >= group.getCapacity()) {
            throw new IllegalStateException("Group is full. Cannot assign student.");
        }

        student.setGroup(group);
        return repository.save(student);
    }

    public List<StudentDTO> getStudentsByGenerationAndGroup(Long generationId, Long groupId) {
        return repository.findByGenerationIdAndGroupId(generationId, groupId);
    }
}

