package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Admin;
import com.learning_management_system.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController extends BasicControllerOperations<AdminService, Admin> {

   public AdminController(AdminService service) {
      super(service);
   }

}