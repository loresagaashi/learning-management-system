package com.learning_management_system.controller;

import com.learning_management_system.data.professor.ProfessorSearchDTO;
import com.learning_management_system.model.Course;
import com.learning_management_system.model.Professor;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.ProfessorService;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professors")
public class ProfessorController extends BasicControllerOperations<ProfessorService, Professor>{

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService service, ProfessorService professorService){
        super(service);
        this.professorService = professorService;
    }

        @PostMapping("/login")
    public Professor login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }

    @GetMapping("/search-professors")
    public List<ProfessorSearchDTO> getProfessors(@RequestParam(required = false) String search) {
        return professorService.getProfessors(search);
    }
    @GetMapping("/{professorId}/courses")
    public List<Course> getCoursesByProfessor(@PathVariable Long professorId) {
        return professorService.getCoursesByProfessor(professorId);
    }

}