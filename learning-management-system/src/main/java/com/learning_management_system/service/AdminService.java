package com.learning_management_system.service;

import org.springframework.stereotype.Service;

import com.learning_management_system.model.Admin;
import com.learning_management_system.repository.AdminRepository;

@Service
public class AdminService extends BasicServiceOperations<AdminRepository, Admin> {

   public AdminService(AdminRepository repository) {
      super(repository);
   }
}
