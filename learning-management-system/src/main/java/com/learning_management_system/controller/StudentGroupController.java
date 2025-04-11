package com.learning_management_system.controller;

import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.service.StudentGroupService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
