package com.learning_management_system.controller;

import com.learning_management_system.data.email.SendEmailDTO;
import com.learning_management_system.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/emails")
@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody SendEmailDTO sendEmailDTO) {
        emailService.sendSimpleEmail(sendEmailDTO);
        return "Email sent successfully!";
    }
}
