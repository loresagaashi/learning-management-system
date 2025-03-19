package com.learning_management_system.service;

import com.learning_management_system.model.Report;
import com.learning_management_system.repository.ReportRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportService extends BasicServiceOperations<ReportRepository, Report>{

    public ReportService(ReportRepository repository){
        super(repository);
    }
}

