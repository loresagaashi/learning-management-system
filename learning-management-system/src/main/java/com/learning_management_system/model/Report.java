package com.learning_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
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

    //TODO  Studentin
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "student_id")
//    private Student student;
}
