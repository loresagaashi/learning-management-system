package com.learning_management_system.service;

import com.learning_management_system.data.student.StudentDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import com.learning_management_system.model.*;
import com.learning_management_system.repository.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
// import com.learning_management_system.model.Professor;
// import com.learning_management_system.repository.ProfessorRepository;

import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService extends BasicServiceOperations<StudentRepository, Student> {

     private final PasswordEncoder passwordEncoder;
     private final StudentRepository studentRepository;
     private final EmailService emailService;
     private final StudentGroupRepository studentGroupRepository;
     private final StudentSemesterRepository studentSemesterRepository;
     private final StudentGroupSemesterRepository studentGroupSemesterRepository;
    @Autowired
    private GradeRepository gradeRepository;



    public StudentService(StudentRepository repository, PasswordEncoder passwordEncoder, StudentRepository studentRepository, EmailService emailService, StudentGroupRepository studentGroupRepository, StudentSemesterRepository studentSemesterRepository, StudentGroupSemesterRepository studentGroupSemesterRepository) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.emailService = emailService;
        this.studentGroupRepository = studentGroupRepository;
        this.studentSemesterRepository = studentSemesterRepository;
        this.studentGroupSemesterRepository = studentGroupSemesterRepository;
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

    public Student assignToGroup(Long studentId, Long groupId) throws MessagingException, IOException {
        Student student = repository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        StudentGroup group = studentGroupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        int currentSize = studentRepository.countStudentsInGroup(groupId);

        if (group.getCapacity() != null && currentSize >= group.getCapacity()) {
            throw new IllegalStateException("Group is full. Cannot assign student.");
        }

        Optional<StudentSemester> studentSemesterOpt =
                studentSemesterRepository.findTopByStudentAndSemester_GenerationOrderByRegistrationDateDesc(student, group.getGeneration());

        if (studentSemesterOpt.isEmpty()) {
            throw new IllegalStateException("Student must register in a semester of this generation before joining the group.");
        }

        Semester semester = studentSemesterOpt.get().getSemester();


        Optional<StudentGroupSemester> existingGroupSemester =
                studentGroupSemesterRepository.findByGroupAndSemester(group, semester);

        if (existingGroupSemester.isEmpty()) {
            StudentGroupSemester groupSemester = new StudentGroupSemester();
            groupSemester.setGroup(group);
            groupSemester.setSemester(semester);
            studentGroupSemesterRepository.save(groupSemester);
        }

        student.setGroup(group);
        try {
            emailService.sendAssignToGroupEmailToStudent(studentId);
        }catch (MessagingException | IOException e) {
            throw new RuntimeException("Failed to send assign to group email", e);
        }
        return repository.save(student);
    }

    public List<StudentDTO> getStudentsByGenerationAndGroup(Long generationId, Long groupId) {
        return repository.findByGenerationIdAndGroupId(generationId, groupId);
    }

    public List<Grade> getGradesForStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        return gradeRepository.findByStudent(student);
    }

    public List<StudentDTO> getStudentsByGeneration(Long generationId) {
        return repository.findAllByGenerationId(generationId);
    }

    public boolean isStudentAssignedToGroup(Long studentId, Long groupId) {
        return studentRepository.findById(studentId)
                .map(student -> student.getGroup() != null && student.getGroup().getId().equals(groupId))
                .orElse(false);
    }
}

