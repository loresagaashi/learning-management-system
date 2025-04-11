package com.learning_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/all")
    public List<Material> findAll() {
        return materialService.findAllWithLectureNames();
    }

    @PostMapping("/save")
    public Material saveMaterialWithLecture(@RequestBody Material material) {
        return materialService.saveMaterialWithLecture(material);
    }
}