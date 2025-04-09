package com.learning_management_system.data.material;

import lombok.Data;

@Data
public class MaterialResponseDTO {
    private String id;
    private Long lectureId;
    private String lectureName;
    private String fileUrl;
    private String description;
}
