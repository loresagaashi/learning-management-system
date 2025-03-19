package com.learning_management_system.controller;

import com.learning_management_system.model.Report;
import com.learning_management_system.service.ReportService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController extends BasicControllerOperations<ReportService, Report>{

    public ReportController(ReportService service){
        super(service);
    }
}