package com.learning_management_system.controller;

import com.learning_management_system.data.student.AssignStudentToGroupRequest;
import com.learning_management_system.data.student.StudentDTO;
import com.learning_management_system.data.student.StudentSearchDTO;
import com.learning_management_system.model.Grade;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.learning_management_system.model.Student;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController extends BasicControllerOperations<StudentService, Student>{

    private final StudentService studentService;

    public StudentController (StudentService service, StudentService studentService){
        super(service);
        this.studentService = studentService;
    }
        @PostMapping("/login")
    public Student login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }

    @GetMapping("/search-students")
    public List<StudentSearchDTO> getStudents(@RequestParam(required = false) String search) {
        return studentService.getStudents(search);
    }

    @PostMapping("/assign-to-group")
    public Student assignToGroup(@RequestBody AssignStudentToGroupRequest request) {
        return studentService.assignToGroup(request.getStudentId(), request.getGroupId());
    }

    @GetMapping("/by-generation-and-group")
    public List<StudentDTO> getByGenerationAndGroup(@RequestParam Long generationId,
                                                    @RequestParam Long groupId) {
        return studentService.getStudentsByGenerationAndGroup(generationId, groupId);
    }
    @GetMapping("/{studentId}/grades")
    public List<Grade> getGradesForStudent(@PathVariable Long studentId) {
        return studentService.getGradesForStudent(studentId);
    }

    @GetMapping("/by-generation")
    public ResponseEntity<List<StudentDTO>> getStudentsByGeneration(@RequestParam Long generationId) {
        List<StudentDTO> students = studentService.getStudentsByGeneration(generationId);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{studentId}/group/{groupId}/check")
    public ResponseEntity<Boolean> isStudentAssignedToGroup(
            @PathVariable Long studentId,
            @PathVariable Long groupId) {

        boolean isAssigned = studentService.isStudentAssignedToGroup(studentId, groupId);
        return ResponseEntity.ok(isAssigned);
    }
}