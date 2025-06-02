package com.learning_management_system.controller;

import com.learning_management_system.data.studentGroup.StudentGroup1;
import com.learning_management_system.data.studentGroup.StudentGroupDTO;
import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.service.StudentGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student-groups")
public class StudentGroupController extends BasicControllerOperations<StudentGroupService, StudentGroup> {
    private final StudentGroupService studentGroupService;
    public StudentGroupController(StudentGroupService service, StudentGroupService studentGroupService) {
        super(service);
        this.studentGroupService = studentGroupService;
    }

    @GetMapping("/group/{groupId}/available-spots")
    public int getAvailableSpots(@PathVariable Long groupId) {
        return studentGroupService.getAvailableSpotsInGroup(groupId);
    }

    @GetMapping("/by-generation-and-semester")
    public ResponseEntity<List<StudentGroupDTO>> getGroupsByGenerationAndSemester(
            @RequestParam String generationName,
            @RequestParam Long semesterId) {
        List<StudentGroupDTO> groups = studentGroupService.getGroupsByGenerationAndSemester(generationName, semesterId);
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/by-generation")
    public ResponseEntity<List<StudentGroupDTO>> getGroupsByGeneration(
            @RequestParam String generationName) {
        List<StudentGroupDTO> groups = studentGroupService.getGroupsByGeneration(generationName);
        return ResponseEntity.ok(groups);
    }

    @GetMapping
    public ResponseEntity<List<StudentGroup1>> getAllStudentGroups() {
        return ResponseEntity.ok(studentGroupService.getAllStudentGroups());
    }
}
