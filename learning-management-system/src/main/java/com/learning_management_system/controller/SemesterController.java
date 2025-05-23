package com.learning_management_system.controller;

import com.learning_management_system.model.Semester;
import com.learning_management_system.repository.SemesterRepository;
import com.learning_management_system.service.SemesterService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/semester")
public class SemesterController extends BasicControllerOperations<SemesterService, Semester> {

    private final SemesterRepository semesterRepository;

    public SemesterController(SemesterService service, SemesterRepository semesterRepository) {
        super(service);
        this.semesterRepository = semesterRepository;
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> getAllSemesters() {
        return ResponseEntity.ok(semesterRepository.findAll());
    }

}