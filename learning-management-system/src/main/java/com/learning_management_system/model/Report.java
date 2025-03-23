package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "reports")
public class Report extends BaseAuditEntity{

    @Column(name = "report_date")
    private Date reportDate;

    @Column(name = "performance")
    private String performance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_report_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
    private Student student;
}
