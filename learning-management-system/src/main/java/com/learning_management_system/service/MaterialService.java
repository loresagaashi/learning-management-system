package com.learning_management_system.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
        return materialRepository.findAll().stream().peek(material -> {
            Lecture lecture = lectureRepository.findById(material.getLectureId()).orElse(null);
            material.setLecture(lecture);
        }).collect(Collectors.toList());
    }

    public Material saveMaterialWithLecture(Material material) {
        lectureRepository.findById(material.getLectureId()).orElseThrow(() -> new RuntimeException("Lecture not found"));
        return materialRepository.save(material);
    }
    public Lecture getLectureById(Long id) {
        return lectureRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lecture not found"));
    }
    public String saveFileAndReturnUrl(MultipartFile file, Long lectureId) throws IOException {
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
    material.setLectureId(lectureId); // you may need to adapt this

    materialRepository.save(material);

    return material.getFileUrl(); // or full URL if serving via static path
}
}