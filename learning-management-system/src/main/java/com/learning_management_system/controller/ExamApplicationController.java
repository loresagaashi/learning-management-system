package com.learning_management_system.controller;

import com.learning_management_system.data.exam.ExamApplicationInfoDTO;
import com.learning_management_system.data.exam.PassedExamsResponseDTO;
import com.learning_management_system.data.exam.UnmarkedExamDTO;
import com.learning_management_system.model.ExamApplication;
import com.learning_management_system.repository.ExamApplicationRepository;
import com.learning_management_system.service.ExamApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exam-applications")
@RequiredArgsConstructor
public class ExamApplicationController {

    private final ExamApplicationService examApplicationService;

    private final ExamApplicationRepository examApplicationRepository;

    @PostMapping("/register")
    public ResponseEntity<ExamApplication> registerToExam(@RequestParam Long examId, @RequestParam Long studentId) {
        ExamApplication application = examApplicationService.registerStudentToExam(examId, studentId);
        return ResponseEntity.ok(application);
    }

    @PostMapping("/grade")
    public ResponseEntity<ExamApplication> gradeStudent(@RequestParam Long examId, @RequestParam Long studentId, @RequestParam Double grade) {
        ExamApplication application = examApplicationService.gradeStudent(examId, studentId, grade);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/passed/{studentId}")
    public ResponseEntity<PassedExamsResponseDTO> getPassedExams(@PathVariable Long studentId) {
        PassedExamsResponseDTO response = examApplicationService.getPassedExamsWithAverage(studentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unmarked/{studentId}")
    public ResponseEntity<List<UnmarkedExamDTO>> getUnmarkedExams(@PathVariable Long studentId) {
        return ResponseEntity.ok(examApplicationRepository.findUnmarkedExamsByStudentId(studentId));
    }

    @GetMapping("/by-professor/{professorId}")
    public ResponseEntity<List<ExamApplicationInfoDTO>> getExamApplicationsByProfessor(
            @PathVariable Long professorId) {
        List<ExamApplicationInfoDTO> applications = examApplicationService.getExamApplicationsByProfessor(professorId);
        return ResponseEntity.ok(applications);
    }

}
