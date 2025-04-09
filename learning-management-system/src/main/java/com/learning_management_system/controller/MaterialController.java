package com.learning_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.learning_management_system.data.material.MaterialResponseDTO;
import com.learning_management_system.data.material.MaterialWithLectureDTO;
import com.learning_management_system.model.Material;
import com.learning_management_system.service.MaterialService;

import java.util.List;

@RestController
@RequestMapping("/materials")
public class MaterialController extends BasicMongoControllerOperations<MaterialService, Material> {
    @Autowired
    private MaterialService materialService;

    public MaterialController(MaterialService service) {
        super(service);
    }

    @GetMapping("/Lecture/{id}")
    public MaterialWithLectureDTO getMaterial(@PathVariable String id) {
        return materialService.getMaterialWithLecture(id);
    }

    @GetMapping("/with-lecture")
    public List<MaterialResponseDTO> getAllMaterialsWithLecture() {
        return materialService.findAllWithLectureNames();
    }

    @PostMapping("/save")
    public Material saveMaterialWithLecture(@RequestBody Material material, @RequestParam Long lectureId) {
        return materialService.saveMaterialWithLecture(material, lectureId);
    }
}