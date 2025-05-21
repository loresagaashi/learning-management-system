package com.learning_management_system.controller;

import com.learning_management_system.service.StudentSemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student-semester")
@RequiredArgsConstructor
public class StudentSemesteController {

    private final StudentSemesterService studentSemesterService;

    @PostMapping("/register")
    public ResponseEntity<String> registerStudentInSemester(
            @RequestParam Long studentId,
            @RequestParam Long semesterId) {
        try {
            String message = studentSemesterService.registerStudentInSemester(studentId, semesterId);
            return ResponseEntity.ok(message);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-student-semesters")
    public ResponseEntity<?> getSemestersForStudent(@RequestParam Long studentId) {
        try {
            return ResponseEntity.ok(studentSemesterService.getSemestersForStudent(studentId));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
