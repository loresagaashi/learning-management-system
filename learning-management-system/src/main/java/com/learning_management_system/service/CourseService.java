package com.learning_management_system.service;

import com.learning_management_system.data.course.CourseDTO;
import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Course;
import com.learning_management_system.model.Generation;
import com.learning_management_system.repository.CourseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService extends BasicServiceOperations<CourseRepository, Course>{

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;

    public CourseService(CourseRepository repository){
        super(repository);
    }

    public Course getCourseWithLectures(Long courseId) {
        return courseRepository.findById(courseId).orElseThrow();
    }
    public List<Student> getStudentsByCourse(Long courseId) {
        return studentRepository.findByCoursesId(courseId); // Assuming relation exists
    }
    public List<Lecture> getLecturesByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return course.getLectures(); // assuming the Course entity has a getLectures() method
    }

       public List<Course> getCoursesByProfessorId(Long professorId) {
        return courseRepository.findByProfessorId(professorId);
    }

    public List<CourseDTO> getUnpassedCourses(Long studentId) {
        return courseRepository.findUnpassedCoursesByStudentId(studentId);
    }
    

        public List<Course> getCoursesBySemesterName(Semester semester) {
        System.out.println("[SemesterService] Finding semesters for generation: " + (semester != null ? semester.getName() : "null"));
        List<Course> courses = courseRepository.findCourseBySemesterName(semester);
        if (courses == null) {
            System.out.println("[SemesterService] Repository returned null for generation: " + (semester != null ? semester.getName() : "null") + ". Returning empty list.");
            return java.util.Collections.emptyList();
        }
        System.out.println("[SemesterService] Found " + courses.size() + " semesters for generation: " + (semester != null ? semester.getName() : "null"));
        return courses;
    }

public List<String> getCourseWithProfessorNames(Long courseId) {
    List<Object[]> results = courseRepository.findCourseWithProfessors(courseId);
    System.out.println("[CourseService] Found " + results.size() + " professor(s) for course " + courseId);

    List<String> professorNames = new ArrayList<>();
    for (Object[] row : results) {
        Course course = (Course) row[0];
        Professor prof = (Professor) row[1];
        System.out.println("[CourseService] Found professor: " + prof.getFirstName() + " " + prof.getLastName() + " for course " + course.getName());
        professorNames.add(prof.getFirstName() + " " + prof.getLastName());
    }
    return professorNames;
}

}
