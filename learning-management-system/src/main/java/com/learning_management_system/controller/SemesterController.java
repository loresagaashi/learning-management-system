package com.learning_management_system.controller;

import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Semester;
import com.learning_management_system.repository.SemesterRepository;
import com.learning_management_system.service.SemesterService;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/semester")
public class SemesterController extends BasicControllerOperations<SemesterService, Semester> {

    private final SemesterRepository semesterRepository;
    private final SemesterService semesterService;

    public SemesterController(SemesterService service, SemesterRepository semesterRepository, SemesterService semesterService) {
        super(service);
        this.semesterRepository = semesterRepository;
        this.semesterService = semesterService;
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> getAllSemesters1() {
        return ResponseEntity.ok(semesterRepository.findAll());
    }

    @PostMapping("/by-generation")
    public ResponseEntity<List<SemesterDTO>> getSemestersByGeneration(@RequestBody Map<String, String> body) {
        String generationName = body.get("generationName");
        List<SemesterDTO> semesters = semesterService.getSemestersByGenerationName(generationName);

        return ResponseEntity.ok(semesters);
    }

    @GetMapping
    public ResponseEntity<List<SemesterDTO>> getAllSemesters() {
        return ResponseEntity.ok(semesterService.getAllWithGenerationName());
    }
}