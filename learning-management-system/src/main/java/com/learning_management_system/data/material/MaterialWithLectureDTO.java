package com.learning_management_system.data.material;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Material;

public record MaterialWithLectureDTO(Material material, Lecture lecture) {}

