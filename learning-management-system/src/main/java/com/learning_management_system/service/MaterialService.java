package com.learning_management_system.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Material;
import com.learning_management_system.repository.LectureRepository;
import com.learning_management_system.repository.MaterialRepository;

@Service
public class MaterialService extends BasicMongoServiceOperations<MaterialRepository, Material> {
    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private MaterialRepository materialRepository;

    public MaterialService(MaterialRepository repository) {
        super(repository);
    }

    public List<Material> findAllWithLectureNames() {
        return materialRepository.findAll().stream().peek(material -> {
            Lecture lecture = lectureRepository.findById(material.getLectureId()).orElse(null);
            material.setLecture(lecture);
        }).collect(Collectors.toList());
    }

    public Material saveMaterialWithLecture(Material material) {
        lectureRepository.findById(material.getLectureId()).orElseThrow(() -> new RuntimeException("Lecture not found"));
        return materialRepository.save(material);
    }
}