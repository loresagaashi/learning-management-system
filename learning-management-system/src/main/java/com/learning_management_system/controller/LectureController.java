package com.learning_management_system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.service.LectureService;
import com.learning_management_system.service.MaterialService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lectures")
public class LectureController extends BasicControllerOperations<LectureService, Lecture> {
    private final MaterialService materialService;

    public LectureController(LectureService service, MaterialService materialService) {
        super(service);
        this.materialService = materialService;
    }

    @PostMapping("/upload-material")
    public ResponseEntity<?> uploadMaterial(
            @RequestParam("file") MultipartFile file,
            @RequestParam("lectureId") Long lectureId) {
        try {
            String url = materialService.saveFileAndReturnUrl(file, lectureId);
            Map<String, String> response = new HashMap<>();
            response.put("url", url);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload material");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }
    @GetMapping("/course/{courseId}")
public ResponseEntity<List<Lecture>> getLecturesByCourse(@PathVariable Long courseId) {
    List<Lecture> lectures = service.findByCourseId(courseId);
    return ResponseEntity.ok(lectures);
}

}