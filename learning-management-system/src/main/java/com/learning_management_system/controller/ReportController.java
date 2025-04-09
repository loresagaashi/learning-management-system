package com.learning_management_system.controller;

import com.learning_management_system.data.material.MaterialWithLectureDTO;
import com.learning_management_system.model.Material;
import com.learning_management_system.model.Report;
import com.learning_management_system.service.MaterialService;
import com.learning_management_system.service.ReportService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports")
public class ReportController extends BasicMongoControllerOperations<ReportService, Report>{
    @Autowired
    private ReportService reportService;

    public ReportController(ReportService service){
        super(service);
    }
    // @GetMapping("/Student/{id}")
    // public ReportWithStudentDTO getReport(@PathVariable String id) {
    //     return reportService.getReportWithStudent(id);
    // }

    @GetMapping("/{ReportStudent}/all")
    public List<Report> findAll() {
        return reportService.findAllWithStudentNames();
    }    

    @PostMapping("/save")
    public Report saveReportWithStudent(@RequestBody Report report) {
        return reportService.saveReportWithStudent(report);
    }
}