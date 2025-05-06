package com.learning_management_system.service;

import com.learning_management_system.data.schedule.ScheduleDTO;
import com.learning_management_system.data.schedule.ScheduleEntryRequest;
import com.learning_management_system.data.schedule.WeeklyScheduleRequest;
import com.learning_management_system.model.*;
import com.learning_management_system.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService extends BasicServiceOperations<ScheduleRepository, Schedule> {

    private final ScheduleRepository scheduleRepository;
    private final StudentGroupRepository studentGroupRepository;
    private final SemesterRepository semesterRepository;
    private final StudentGroupSemesterRepository studentGroupSemesterRepository;
    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;
    private final StudentRepository studentRepository;
    private final StudentSemesterRepository studentSemesterRepository;
    public ScheduleService(ScheduleRepository repository, ScheduleRepository scheduleRepository, StudentGroupRepository studentGroupRepository, SemesterRepository semesterRepository, StudentGroupSemesterRepository studentGroupSemesterRepository, CourseRepository courseRepository, ProfessorRepository professorRepository, StudentRepository studentRepository, StudentSemesterRepository studentSemesterRepository){
        super(repository);
        this.scheduleRepository = scheduleRepository;
        this.studentGroupRepository = studentGroupRepository;
        this.semesterRepository = semesterRepository;
        this.studentGroupSemesterRepository = studentGroupSemesterRepository;
        this.courseRepository = courseRepository;
        this.professorRepository = professorRepository;
        this.studentRepository = studentRepository;
        this.studentSemesterRepository = studentSemesterRepository;
    }

    public List<ScheduleDTO> getWeeklySchedule(Long groupId, Long semesterId) {
        return scheduleRepository.findScheduleForGroupAndSemester(groupId, semesterId);
    }

    public void createWeeklySchedule(WeeklyScheduleRequest request) {
        StudentGroup group = studentGroupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        Semester semester = semesterRepository.findById(request.getSemesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));

        StudentGroupSemester groupSemester = studentGroupSemesterRepository
                .findByGroupAndSemester(group, semester)
                .orElseThrow(() -> new EntityNotFoundException("GroupSemester not found"));

        for (ScheduleEntryRequest entry : request.getScheduleEntries()) {
            Schedule schedule = new Schedule();
            schedule.setGroupSemester(groupSemester);
            schedule.setDayOfWeek(entry.getDayOfWeek());
            schedule.setStartTime(entry.getStartTime());
            schedule.setEndTime(entry.getEndTime());
            schedule.setRoom(entry.getRoom());

            Course course = courseRepository.findById(entry.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found"));

            Professor professor = professorRepository.findById(entry.getProfessorId())
                    .orElseThrow(() -> new EntityNotFoundException("Professor not found"));

            schedule.setCourse(course);
            schedule.setProfessor(professor);

            scheduleRepository.save(schedule);
        }
    }

    public List<ScheduleDTO> getScheduleForStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        // Merr semestrin aktiv ku studenti është regjistruar (mund të ketë logjikë për "latest")
        StudentSemester studentSemester = studentSemesterRepository.findTopByStudentOrderByRegistrationDateDesc(student)
                .orElseThrow(() -> new EntityNotFoundException("Student is not registered in any semester"));

        Semester semester = studentSemester.getSemester();

        StudentGroup group = student.getGroup();
        if (group == null) {
            throw new IllegalStateException("Student is not assigned to any group");
        }

        StudentGroupSemester groupSemester = studentGroupSemesterRepository
                .findByGroupAndSemester(group, semester)
                .orElseThrow(() -> new EntityNotFoundException("GroupSemester not found for student"));

        return scheduleRepository.findScheduleForGroupAndSemester(group.getId(), semester.getId());
    }



}
