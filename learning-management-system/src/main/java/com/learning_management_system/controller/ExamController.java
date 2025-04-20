package com.learning_management_system.controller;

import com.learning_management_system.data.exam.ExamGradeDTO;
import com.learning_management_system.model.Exam;
import com.learning_management_system.service.ExamService;
import com.learning_management_system.service.GradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final GradeService gradeService;

    public ExamController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping("/students/{studentId}/exam-grades")
    public ResponseEntity<List<ExamGradeDTO>> getStudentExamGrades(@PathVariable Long studentId) {
        List<ExamGradeDTO> examGrades = gradeService.getExamGradesDtoForStudent(studentId);
        return ResponseEntity.ok(examGrades);
    }
}

