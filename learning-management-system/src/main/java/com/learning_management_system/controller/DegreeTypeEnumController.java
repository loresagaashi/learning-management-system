package com.learning_management_system.controller;

import com.learning_management_system.enums.DegreeType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DegreeTypeEnumController {

    @GetMapping("/api/degree-types")
    public DegreeType[] getDegreeTypes() {
        return DegreeType.values();
    }
}
