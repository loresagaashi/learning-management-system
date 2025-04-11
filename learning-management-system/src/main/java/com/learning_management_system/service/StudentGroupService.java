package com.learning_management_system.service;

import com.learning_management_system.model.StudentGroup;
import com.learning_management_system.repository.StudentGroupRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StudentGroupService extends BasicServiceOperations<StudentGroupRepository, StudentGroup> {
    private final StudentGroupRepository studentGroupRepository;
    public StudentGroupService(StudentGroupRepository repository, StudentGroupRepository studentGroupRepository) {
        super(repository);
        this.studentGroupRepository = studentGroupRepository;
    }
    public int getAvailableSpotsInGroup(Long groupId) {
        StudentGroup group = studentGroupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        int assignedStudents = repository.countStudentsInGroup(groupId);
        int capacity = group.getCapacity() != null ? group.getCapacity() : 0;

        return Math.max(capacity - assignedStudents, 0);
    }

}