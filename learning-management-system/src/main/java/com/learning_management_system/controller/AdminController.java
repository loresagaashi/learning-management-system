package com.learning_management_system.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.Admin;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController extends BasicControllerOperations<AdminService, Admin> {

   public AdminController(AdminService service) {
      super(service);
   }
    @PostMapping("/login")
    public Admin login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
}