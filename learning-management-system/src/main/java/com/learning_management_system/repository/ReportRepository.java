package com.learning_management_system.repository;

import com.learning_management_system.model.Report;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportRepository extends MongoRepository<Report, String> {
}
