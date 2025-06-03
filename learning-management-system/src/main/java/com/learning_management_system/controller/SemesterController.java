package com.learning_management_system.controller;

import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Generation;
import com.learning_management_system.repository.SemesterRepository;
import com.learning_management_system.service.SemesterService;
import com.learning_management_system.service.GenerationService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/semester")
public class SemesterController extends BasicControllerOperations<SemesterService, Semester> {

    private final SemesterRepository semesterRepository;
    private final SemesterService semesterService;
    private final GenerationService generationService;

    public SemesterController(SemesterService service, SemesterRepository semesterRepository,
            SemesterService semesterService, GenerationService generationService) {
        super(service);
        this.semesterRepository = semesterRepository;
        this.semesterService = semesterService;
        this.generationService = generationService;
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> getAllSemesters1() {
        return ResponseEntity.ok(semesterRepository.findAll());
    }

    @GetMapping("/by-generation")
    public ResponseEntity<List<SemesterDTO>> getSemestersByGeneration(@RequestParam String generationName) {
        Generation generation = generationService.findByName(generationName);
        if (generation == null) {
            return ResponseEntity.notFound().build(); // Or handle as appropriate
        }
        List<SemesterDTO> semesters = semesterService.getSemestersByGenerationName(generation);
        return ResponseEntity.ok(semesters);
    }

    @GetMapping
    public ResponseEntity<List<SemesterDTO>> getAllSemesters() {
        return ResponseEntity.ok(semesterService.getAllWithGenerationName());
    }

    @GetMapping("/by-generation/{generationId}")
    public ResponseEntity<List<Semester>> getSemestersByGenerationId(@PathVariable Long generationId) {
        List<Semester> semesters = semesterService.getSemestersByGenerationId(generationId);
        return ResponseEntity.ok(semesters);
    }

}