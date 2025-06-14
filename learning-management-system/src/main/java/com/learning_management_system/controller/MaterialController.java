package com.learning_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Material;
import com.learning_management_system.service.MaterialService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/materials")
public class MaterialController extends BasicMongoControllerOperations<MaterialService, Material> {
    @Autowired
    private MaterialService materialService;

    public MaterialController(MaterialService service) {
        super(service);
    }
    @GetMapping("/all")
    public List<Material> findAll() {
        return materialService.findAllWithLectureNames();
    }

    @PostMapping("/save")
    public Material saveMaterialWithLecture(@RequestBody Material material) {
        return materialService.saveMaterialWithLecture(material);
    }
    @PostMapping("/upload")
public ResponseEntity<?> uploadMaterial(@RequestParam("file") MultipartFile file,
                                        @RequestParam("lectureId") Long lectureId,
                                        @RequestParam(value = "description", required = false) String description) {
                                            System.out.println("Received lectureId: " + lectureId);
                                            try {
        String uploadDir = "uploads/materials/";
        Files.createDirectories(Paths.get(uploadDir));

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);
        Files.write(filePath, file.getBytes());

        Lecture lecture = materialService.getLectureById(lectureId);

        Material material = new Material();
        material.setFileUrl(filePath.toString());
        material.setLectureId(lectureId);
        material.setDescription(description);
        material.setLecture(lecture);

        materialService.save(material);

        return ResponseEntity.ok(material); // ✅ return the saved Material
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
    }
}

}