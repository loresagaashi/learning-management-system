package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Attendance extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "lecture_id", nullable = false, foreignKey = @ForeignKey(name = "fk_attendance_lecture"))
    private Lecture lecture; // Lecture for which attendance is taken

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false, foreignKey = @ForeignKey(name = "fk_attendance_student"))
    private Student student; // The student attending the lecture

    private boolean present;
}
