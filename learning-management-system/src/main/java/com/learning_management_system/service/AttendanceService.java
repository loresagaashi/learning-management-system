package com.learning_management_system.service;

import com.learning_management_system.model.Attendance;
import com.learning_management_system.model.Course;
import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.AttendanceRepository;
import com.learning_management_system.repository.CourseRepository;
import com.learning_management_system.repository.LectureRepository;
import com.learning_management_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService extends BasicServiceOperations<AttendanceRepository, Attendance>{

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private StudentRepository studentRepository;

    public AttendanceService(AttendanceRepository repository){
        super(repository);
    }
    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get lectures for a specific course
    public List<Lecture> getLecturesForCourse(Long courseId) {
        return lectureRepository.findByCourseId(courseId);
    }

    // Record attendance for a lecture
    public void recordAttendance(Long lectureId, List<Long> studentIds, boolean present) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();

        for (Long studentId : studentIds) {
            Student student = studentRepository.findById(studentId).orElseThrow();  // Fetch Student from the database
            Attendance attendance = new Attendance();
            attendance.setLecture(lecture);
            attendance.setStudent(student);  // Set the fetched student
            attendance.setPresent(present);
            attendanceRepository.save(attendance);
        }
    }
}
