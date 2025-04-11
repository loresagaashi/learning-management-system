package com.learning_management_system.controller;

import com.learning_management_system.model.Material;
import com.learning_management_system.model.Report;
import com.learning_management_system.service.MaterialService;
import com.learning_management_system.service.ReportService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class ReportController extends BasicMongoControllerOperations<ReportService, Report>{
    @Autowired
    private ReportService reportService;

    public ReportController(ReportService service){
        super(service);
    }
    @GetMapping("/all")
    public List<Report> findAll() {
        return reportService.findAllWithStudentNames();
    }    

    @PostMapping("/save")
    public Report saveReportWithStudent(@RequestBody Report report) {
        return reportService.saveReportWithStudent(report);
    }
}