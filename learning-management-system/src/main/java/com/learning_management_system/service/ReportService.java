package com.learning_management_system.service;

import com.learning_management_system.model.Lecture;
import com.learning_management_system.model.Material;
import com.learning_management_system.model.Student;
import com.learning_management_system.model.Report;
import com.learning_management_system.repository.MaterialRepository;
import com.learning_management_system.repository.ReportRepository;
import com.learning_management_system.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;

@Service
public class ReportService extends BasicMongoServiceOperations<ReportRepository, Report> {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ReportRepository reportRepository;

    public ReportService(ReportRepository repository, SecurityFilterChain securityFilterChain) {
        super(repository);
    }

    public List<Report> findAllWithStudentNames() {
        return reportRepository.findAll().stream().peek(report -> {
            Student student = studentRepository.findById(report.getStudentId()).orElse(null);
            report.setStudent(student);
        }).collect(Collectors.toList());
    }

    public Report saveReportWithStudent(Report report) {
        studentRepository.findById(report.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found"));
        return reportRepository.save(report);
    }
}
