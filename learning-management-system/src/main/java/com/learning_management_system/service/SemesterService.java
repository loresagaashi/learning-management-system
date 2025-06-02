package com.learning_management_system.service;

import com.learning_management_system.data.semester.SemesterDTO;
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
            if (semester.getId() == null) { // krijim i ri
                if (activeCount >= 2) {
                    throw new IllegalStateException("Mund të jenë vetëm 2 semestre aktive për këtë gjeneratë.");
                }
            } else {

                Optional<Semester> existingSemester = semesterRepository.findById(semester.getId());
                if (existingSemester.isPresent()) {
                    boolean wasActive = existingSemester.get().getActive() != null && existingSemester.get().getActive();
                    boolean isActive = semester.getActive();

                    if (!wasActive && isActive && activeCount >= 2) {
                        throw new IllegalStateException("Mund të jenë vetëm 2 semestre aktive për këtë gjeneratë.");
                    }
                }
            }
        }

        return super.save(semester);
    }

    public List<SemesterDTO> getSemestersByGenerationName(String generationName) {
        return semesterRepository.findSemestersByGenerationName(generationName);
    }

    public List<SemesterDTO> getAllWithGenerationName() {
        return semesterRepository.findAllWithGenerationName();
    }
}

