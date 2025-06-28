package com.learning_management_system.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        System.out.println("MaterialService.findAllWithLectureNames() called");
        List<Material> allMaterials = materialRepository.findAll();
        System.out.println("Found " + allMaterials.size() + " materials in database");
        
        // Filter out materials with null lectureId to avoid null ID errors
        List<Material> validMaterials = allMaterials.stream()
            .filter(material -> material.getLectureId() != null)
            .collect(Collectors.toList());
        
        System.out.println("Found " + validMaterials.size() + " materials with valid lectureId");
        
        return validMaterials.stream().peek(material -> {
            System.out.println("Processing material: " + material.getId() + ", lectureId: " + material.getLectureId());
            try {
                System.out.println("Looking for lecture with ID: " + material.getLectureId());
                Lecture lecture = lectureRepository.findById(material.getLectureId()).orElse(null);
                System.out.println("Found lecture: " + (lecture != null ? lecture.getName() : "null"));
                material.setLecture(lecture);
            } catch (Exception e) {
                // Log the error but don't fail the entire request
                System.err.println("Error finding lecture for material " + material.getId() + ": " + e.getMessage());
                e.printStackTrace();
                material.setLecture(null);
            }
        }).collect(Collectors.toList());
    }

    public Material saveMaterialWithLecture(Material material) {
        if (material.getLectureId() == null) {
            throw new RuntimeException("Lecture ID cannot be null");
        }
        lectureRepository.findById(material.getLectureId()).orElseThrow(() -> new RuntimeException("Lecture not found"));
        
        // Set createdOn if not already set
        if (material.getCreatedOn() == null) {
            material.setCreatedOn(LocalDateTime.now());
        }
        
        return materialRepository.save(material);
    }
    
    public Lecture getLectureById(Long id) {
        if (id == null) {
            throw new RuntimeException("Lecture ID cannot be null");
        }
        return lectureRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lecture not found"));
    }
    
    public List<Material> findByLectureId(Long lectureId) {
        if (lectureId == null) {
            throw new RuntimeException("Lecture ID cannot be null");
        }
        return materialRepository.findByLectureId(lectureId);
    }
    
    public Material uploadMaterialForLecture(MultipartFile file, Long lectureId, String description) throws IOException {
        if (lectureId == null) {
            throw new RuntimeException("Lecture ID cannot be null");
        }
        
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Save file to a directory
        Path uploadPath = Paths.get("uploads/materials");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save the material in MongoDB
        Material material = new Material();
        material.setFileUrl("/uploads/materials/" + fileName);
        material.setLectureId(lectureId);
        material.setDescription(description);
        material.setCreatedOn(LocalDateTime.now());

        return materialRepository.save(material);
    }
    
    public String saveFileAndReturnUrl(MultipartFile file, Long lectureId) throws IOException {
        if (lectureId == null) {
            throw new RuntimeException("Lecture ID cannot be null");
        }
        
        // Example logic – you can adapt this to store the file on disk, cloud, DB, etc.
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Save file to a directory (e.g., /uploads)
        Path uploadPath = Paths.get("uploads");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save the material in MongoDB (assuming you use it)
        Material material = new Material();
        material.setFileUrl("/uploads/" + fileName);
        material.setLectureId(lectureId);
        material.setCreatedOn(LocalDateTime.now());

        materialRepository.save(material);

        return material.getFileUrl(); // or full URL if serving via static path
    }
}