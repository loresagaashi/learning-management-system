package com.learning_management_system.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.data.material.MaterialResponseDTO;
import com.learning_management_system.data.material.MaterialWithLectureDTO;
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

    public MaterialWithLectureDTO getMaterialWithLecture(String materialId) {
        Material material = materialRepository.findById(materialId).orElseThrow();
        Lecture lecture = lectureRepository.findById(material.getLectureId()).orElse(null);

        return new MaterialWithLectureDTO(material, lecture);
    }

    public List<MaterialResponseDTO> findAllWithLectureNames() {
        return materialRepository.findAll().stream().map(material -> {
            Lecture lecture = lectureRepository.findById(material.getLectureId()).orElse(null);
            MaterialResponseDTO dto = new MaterialResponseDTO();
            dto.setId(material.getId());
            dto.setLectureId(material.getLectureId());
            dto.setLectureName(lecture != null ? lecture.getName() : null);
            dto.setFileUrl(material.getFileUrl());
            dto.setDescription(material.getDescription());
            return dto;
        }).collect(Collectors.toList());
    }

    public Material saveMaterialWithLecture(Material material, Long lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new RuntimeException("Lecture not found"));
        material.setLectureId(lectureId);
        return materialRepository.save(material);
    }
}