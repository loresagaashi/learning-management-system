package com.learning_management_system.service;

import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.data.semester.SemesterDTO1;
import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Semester;
import com.learning_management_system.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SemesterService extends BasicServiceOperations<SemesterRepository, Semester> {

    private final SemesterRepository semesterRepository;

    public SemesterService (SemesterRepository repository, SemesterRepository semesterRepository){
        super(repository);
        this.semesterRepository = semesterRepository;
    }

    @Override
    public Semester save(Semester semester) {
        if (Boolean.TRUE.equals(semester.getActive())) {
            long activeCount = semesterRepository.countByGenerationAndActiveIsTrue(semester.getGeneration());
            if (semester.getId() == null) {
                if (activeCount >= 1) {
                    throw new IllegalStateException("There can only be one active semester for this generation.");
                }
            } else {

                Optional<Semester> existingSemester = semesterRepository.findById(semester.getId());
                if (existingSemester.isPresent()) {
                    boolean wasActive = existingSemester.get().getActive() != null && existingSemester.get().getActive();
                    boolean isActive = semester.getActive();

                    if (!wasActive && isActive && activeCount >= 1) {
                        throw new IllegalStateException("There can only be one active semester for this generation.");
                    }
                }
            }
        }

        return super.save(semester);
    }

    public List<SemesterDTO> getSemestersByGenerationNameGet(Generation generation) {
        System.out.println("[SemesterService] Finding semesters for generation: " + (generation != null ? generation.getName() : "null"));
        List<SemesterDTO> semesters = semesterRepository.findSemestersByGenerationNameGet(generation);
        if (semesters == null) {
            System.out.println("[SemesterService] Repository returned null for generation: " + (generation != null ? generation.getName() : "null") + ". Returning empty list.");
            return java.util.Collections.emptyList();
        }
        System.out.println("[SemesterService] Found " + semesters.size() + " semesters for generation: " + (generation != null ? generation.getName() : "null"));
        return semesters;
    }

    public List<SemesterDTO> getSemestersByGenerationName(String generationName) {
        return semesterRepository.findSemestersByGenerationName(generationName);
    }

    public List<SemesterDTO1> getAllWithGenerationName() {
        return semesterRepository.findAllWithGenerationName();
    }

    public List<Semester> getSemestersByGenerationId(Long generationId) {
        return semesterRepository.findByGenerationId(generationId);
    }

    public Semester findByName(String name) {
        return semesterRepository.findByName(name);
    }
    
}

