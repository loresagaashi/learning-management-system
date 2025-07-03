package com.learning_management_system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Course;
import com.learning_management_system.model.Material;
import com.learning_management_system.service.LectureService;
import com.learning_management_system.service.CourseService;
import com.learning_management_system.service.MaterialService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lectures")
public class LectureController extends BasicControllerOperations<LectureService, Lecture> {
    private final MaterialService materialService;
    private final CourseService courseService;

    public LectureController(LectureService service, MaterialService materialService, CourseService courseService) {
        super(service);
        this.materialService = materialService;
        this.courseService = courseService;
    }

    @Override
    @PutMapping
    public Lecture update(@RequestBody Lecture lecture) {
        System.out.println("LectureController.update() called with lecture: " + lecture);
        System.out.println("Lecture ID: " + lecture.getId());
        System.out.println("Lecture name: " + lecture.getName());
        System.out.println("Lecture course: " + (lecture.getCourse() != null ? lecture.getCourse().getId() : "null"));
        
        try {
            Lecture updatedLecture = super.update(lecture);
            System.out.println("Lecture updated successfully: " + updatedLecture.getId());
            return updatedLecture;
        } catch (Exception e) {
            System.err.println("Error updating lecture: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping("/create-with-course")
    public ResponseEntity<Lecture> createLectureWithCourse(@RequestBody Map<String, Object> request) {
        try {
            Lecture lecture = new Lecture();
            lecture.setName((String) request.get("name"));
            // Set topic if provided
            if (request.containsKey("topic")) {
                lecture.setTopic((String) request.get("topic"));
            }
            // Set lectureDate if provided (optional, needs parsing if sent)
            // Convert courseId to Course object
            Long courseId = Long.valueOf(request.get("courseId").toString());
            Course course = courseService.findById(courseId);
            if (course == null) {
                return ResponseEntity.badRequest().build();
            }
            lecture.setCourse(course);
            
            Lecture savedLecture = service.save(lecture);
            return ResponseEntity.ok(savedLecture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create-with-materials")
    public ResponseEntity<Lecture> createLectureWithMaterials(
            @RequestParam("name") String name,
            @RequestParam("topic") String topic,
            @RequestParam("courseId") Long courseId,
            @RequestParam(value = "files", required = false) MultipartFile[] files,
            @RequestParam(value = "descriptions", required = false) String[] descriptions) {
        try {
            // Create the lecture
            Lecture lecture = new Lecture();
            lecture.setName(name);
            lecture.setTopic(topic);
            
            Course course = courseService.findById(courseId);
            if (course == null) {
                return ResponseEntity.badRequest().build();
            }
            lecture.setCourse(course);
            
            Lecture savedLecture = service.save(lecture);
            
            // Upload materials if provided
            if (files != null && files.length > 0) {
                for (int i = 0; i < files.length; i++) {
                    if (files[i] != null && !files[i].isEmpty()) {
                        String description = (descriptions != null && i < descriptions.length) ? descriptions[i] : "";
                        materialService.uploadMaterialForLecture(files[i], savedLecture.getId(), description);
                    }
                }
            }
            
            return ResponseEntity.ok(savedLecture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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

    @GetMapping("/{lectureId}/materials")
    public ResponseEntity<List<Material>> getMaterialsByLecture(@PathVariable Long lectureId) {
        List<Material> materials = materialService.findByLectureId(lectureId);
        return ResponseEntity.ok(materials);
    }
}