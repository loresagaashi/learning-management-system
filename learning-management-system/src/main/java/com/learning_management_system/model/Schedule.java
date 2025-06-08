package com.learning_management_system.model;

import java.time.DayOfWeek;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Schedule extends BaseEntity {
    
//    @ManyToOne
//    @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_schedule_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
//    private Student student;
//    @ManyToOne
//    @JoinColumn(name = "group_id", nullable = false, foreignKey = @ForeignKey(name = "fk_schedule_group"))
//    private StudentGroup group;
    @ManyToOne
    @JoinColumn(name = "group_semester_id", nullable = false)
    private StudentGroupSemester groupSemester;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = true, foreignKey = @ForeignKey(name = "fk_schedule_course", foreignKeyDefinition = "FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE RESTRICT"))
    private Course course;
    
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;
    
    private String startTime;
    private String endTime;
    private String room;
    
    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true, foreignKey = @ForeignKey(name = "fk_schedule_professor", foreignKeyDefinition = "FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE RESTRICT"))
    private Professor professor;
}


