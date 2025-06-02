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

        // Krijo StudentGroupSemester nëse nuk ekziston
        StudentGroupSemester groupSemester = studentGroupSemesterRepository
                .findByGroupAndSemester(group, semester)
                .orElseGet(() -> {
                    StudentGroupSemester newGroupSemester = new StudentGroupSemester();
                    newGroupSemester.setGroup(group);
                    newGroupSemester.setSemester(semester);
                    return studentGroupSemesterRepository.save(newGroupSemester);
                });

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

//        StudentSemester studentSemester = studentSemesterRepository.findTopByStudentOrderByRegistrationDateDesc(student)
//                .orElseThrow(() -> new EntityNotFoundException("Student is not registered in any semester"));

        StudentGroup group = student.getGroup();

        StudentGroupSemester groupSemester = studentGroupSemesterRepository
                .findTopByGroupOrderBySemester_RegistrationDateDesc(group)
                .orElseThrow(() -> new EntityNotFoundException("No semester found for this group"));
        Semester semester = groupSemester.getSemester();
        if (group == null) {
            throw new IllegalStateException("Student is not assigned to any group");
        }

        return scheduleRepository.findScheduleForGroupAndSemester(group.getId(), semester.getId());
    }

    public List<ScheduleDTO> getScheduleForGroup(Long groupId) {
        StudentGroup group = studentGroupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));


        StudentGroupSemester groupSemester = studentGroupSemesterRepository
                .findTopByGroupOrderBySemester_RegistrationDateDesc(group)
                .orElseThrow(() -> new EntityNotFoundException("No semester found for this group"));

        Semester semester = groupSemester.getSemester();

        return scheduleRepository.findScheduleForGroupAndSemester(groupId, semester.getId());
    }




}
