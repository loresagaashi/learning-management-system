package com.learning_management_system.service;

import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.model.StudentSemester;
import com.learning_management_system.repository.SemesterRepository;
import com.learning_management_system.repository.StudentRepository;
import com.learning_management_system.repository.StudentSemesterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentSemesterService {

    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;
    private final StudentSemesterRepository studentSemesterRepository;

    @Transactional
    public String registerStudentInSemester(Long studentId, Long semesterId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));

        Semester semester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new RuntimeException("Semester not found with id " + semesterId));

        boolean alreadyRegistered = studentSemesterRepository.existsByStudentAndSemester(student, semester);
        if (alreadyRegistered) {
            throw new IllegalStateException("Student is already registered in this semester.");
        }

        StudentSemester studentSemester = new StudentSemester();
        studentSemester.setStudent(student);
        studentSemester.setSemester(semester);
        studentSemester.setRegistrationDate(LocalDateTime.now());

        studentSemesterRepository.save(studentSemester);

        return "Student registered successfully in semester.";
    }

    public List<StudentSemester> getStudentSemestersByStudentId(Long studentId) {
        return studentSemesterRepository.findByStudentId(studentId);
    }
}
