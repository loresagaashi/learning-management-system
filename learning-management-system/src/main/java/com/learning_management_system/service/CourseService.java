package com.learning_management_system.service;

import com.learning_management_system.data.course.CourseDTO;
import com.learning_management_system.data.semester.SemesterDTO;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Semester;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.StudentRepository;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.OrientationRepository;
import com.learning_management_system.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning_management_system.model.Course;
import com.learning_management_system.model.Generation;
import com.learning_management_system.model.Orientation;
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
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private OrientationRepository orientationRepository;
    @Autowired
    private SemesterRepository semesterRepository;

    public CourseService(CourseRepository repository){
        super(repository);
    }

    @Override
    public Course save(Course entity) {
        System.out.println("[CourseService] save - saving course: " + entity.getName());
        System.out.println("[CourseService] save - initial professors: " + (entity.getProfessor() != null ? entity.getProfessor().size() : "null"));
        System.out.println("[CourseService] save - initial orientation: " + (entity.getOrientation() != null ? entity.getOrientation().getName() : "null"));
        System.out.println("[CourseService] save - initial semester: " + (entity.getSemester() != null ? entity.getSemester().getName() : "null"));
        
        // Handle relationships properly
        if (entity.getProfessor() != null && !entity.getProfessor().isEmpty()) {
            // Ensure professors are properly loaded from database
            List<Professor> professors = new ArrayList<>();
            for (Professor prof : entity.getProfessor()) {
                if (prof.getId() != null) {
                    Professor foundProf = professorRepository.findById(prof.getId()).orElse(null);
                    if (foundProf != null) {
                        professors.add(foundProf);
                    }
                }
            }
            entity.setProfessor(professors);
            System.out.println("[CourseService] save - processed professors: " + professors.size());
        }

        // Handle orientation relationship
        if (entity.getOrientation() != null && entity.getOrientation().getId() != null) {
            Orientation foundOrientation = orientationRepository.findById(entity.getOrientation().getId()).orElse(null);
            entity.setOrientation(foundOrientation);
            System.out.println("[CourseService] save - processed orientation: " + (foundOrientation != null ? foundOrientation.getName() : "null"));
        }

        // Handle semester relationship
        if (entity.getSemester() != null && entity.getSemester().getId() != null) {
            Semester foundSemester = semesterRepository.findById(entity.getSemester().getId()).orElse(null);
            entity.setSemester(foundSemester);
            System.out.println("[CourseService] save - processed semester: " + (foundSemester != null ? foundSemester.getName() : "null"));
        }

        Course savedCourse = super.save(entity);
        System.out.println("[CourseService] save - saved course with ID: " + savedCourse.getId());
        return savedCourse;
    }

    @Override
    public List<Course> findAll() {
        List<Course> courses = courseRepository.findAllWithRelationships();
        System.out.println("[CourseService] findAll - found " + courses.size() + " courses");
        for (Course course : courses) {
            System.out.println("[CourseService] Course: " + course.getName() + 
                             ", Professors: " + (course.getProfessor() != null ? course.getProfessor().size() : "null") +
                             ", Orientation: " + (course.getOrientation() != null ? course.getOrientation().getName() : "null") +
                             ", Semester: " + (course.getSemester() != null ? course.getSemester().getName() : "null"));
        }
        return courses;
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
