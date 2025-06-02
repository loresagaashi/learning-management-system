package com.learning_management_system.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.learning_management_system.data.exam.ExamApplicationInfoDTO;
import com.learning_management_system.data.exam.PassedExamDTO;
import com.learning_management_system.data.exam.PassedExamsResponseDTO;
import com.learning_management_system.enums.ExamStatus;
import com.learning_management_system.model.Exam;
import com.learning_management_system.model.ExamApplication;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.ExamApplicationRepository;
import com.learning_management_system.repository.ExamRepository;
import com.learning_management_system.repository.ScheduleRepository;
import com.learning_management_system.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamApplicationService {


    private final ExamApplicationRepository examApplicationRepository;

    private final ExamRepository examRepository;

    private final StudentRepository studentRepository;


    public ExamApplication registerStudentToExam(Long examId, Long studentId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new NotFoundException("Exam not found"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found"));

//        if (!student.getCourses().contains(exam.getCourse())) {
//            throw new IllegalArgumentException("Student is not registered in the course");
//        }

//        boolean hasSchedule = scheduleRepository.existsByGroupSemesterGroupIdAndCourseIdAndProfessorId(
//                student.getGroup().getId(),
//                exam.getCourse().getId(),
//                exam.getProfessor().getId()
//        );
//
//        if (!hasSchedule) {
//            throw new IllegalArgumentException("Student does not have this course scheduled with the professor");
//        }

        if (examApplicationRepository.findByExamIdAndStudentId(examId, studentId).isPresent()) {
            throw new IllegalArgumentException("Student is already registered for this exam");
        }

        ExamApplication application = new ExamApplication();
        application.setExam(exam);
        application.setStudent(student);
        application.setStatus(ExamStatus.REGISTERED);

        return examApplicationRepository.save(application);
    }

    public ExamApplication gradeStudent(Long examId, Long studentId, Double grade) {
        ExamApplication application = examApplicationRepository.findByExamIdAndStudentId(examId, studentId)
                .orElseThrow(() -> new NotFoundException("Exam application not found"));

        application.setGrade(grade);
        application.setStatus(grade > 5.0 ? ExamStatus.PASSED : ExamStatus.FAILED);

        return examApplicationRepository.save(application);
    }


    public PassedExamsResponseDTO getPassedExamsWithAverage(Long studentId) {
        List<PassedExamDTO> passedExams = examApplicationRepository.findPassedExamsByStudentId(studentId);

        double average = passedExams.stream()
                .mapToDouble(PassedExamDTO::getGrade)
                .average()
                .orElse(0.0);

        return new PassedExamsResponseDTO(passedExams, average);
    }


    public List<ExamApplicationInfoDTO> getExamApplicationsByProfessor(Long professorId) {
        return examApplicationRepository.findAllExamApplicationsByProfessorId(professorId);
    }
}
