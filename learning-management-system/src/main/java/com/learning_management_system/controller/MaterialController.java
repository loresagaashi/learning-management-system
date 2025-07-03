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
        try {
            System.out.println("MaterialController.findAll() called");
            List<Material> materials = materialService.findAllWithLectureNames();
            System.out.println("Found " + materials.size() + " materials");
            return materials;
        } catch (Exception e) {
            System.err.println("Error in MaterialController.findAll(): " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch materials: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public Material saveMaterialWithLecture(@RequestBody Material material) {
        try {
            System.out.println("MaterialController.saveMaterialWithLecture() called with material: " + material);
            return materialService.saveMaterialWithLecture(material);
        } catch (Exception e) {
            System.err.println("Error in MaterialController.saveMaterialWithLecture(): " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to save material: " + e.getMessage());
        }
    }
    
    @GetMapping("/lecture/{lectureId}")
    public List<Material> getMaterialsByLecture(@PathVariable Long lectureId) {
        try {
            System.out.println("MaterialController.getMaterialsByLecture() called with lectureId: " + lectureId);
            return materialService.findByLectureId(lectureId);
        } catch (Exception e) {
            System.err.println("Error in MaterialController.getMaterialsByLecture(): " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch materials for lecture: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadMaterial(@RequestParam("file") MultipartFile file,
                                            @RequestParam("lectureId") Long lectureId,
                                            @RequestParam(value = "description", required = false) String description) {
        System.out.println("Received lectureId: " + lectureId);
        try {
            Material material = materialService.uploadMaterialForLecture(file, lectureId, description);
            return ResponseEntity.ok(material);
        } catch (Exception e) {
            System.err.println("Error in MaterialController.uploadMaterial(): " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{materialId}")
    public ResponseEntity<?> deleteMaterial(@PathVariable String materialId) {
        try {
            System.out.println("MaterialController.deleteMaterial() called with materialId: " + materialId);
            Material material = materialService.findById(materialId);
            if (material == null) {
                return ResponseEntity.notFound().build();
            }
            
            // Delete the physical file
            if (material.getFileUrl() != null) {
                Path filePath = Paths.get(material.getFileUrl().replace("/uploads/", "uploads/"));
                Files.deleteIfExists(filePath);
            }
            
            // Delete from database
            materialService.deleteById(materialId);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error in MaterialController.deleteMaterial(): " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Delete failed: " + e.getMessage());
        }
    }
}