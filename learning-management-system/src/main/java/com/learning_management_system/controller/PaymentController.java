package com.learning_management_system.controller;


import com.learning_management_system.model.Payment;
import com.learning_management_system.service.PaymentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
public class PaymentController extends BasicControllerOperations<PaymentService, Payment>{

    public PaymentController(PaymentService service) {
        super(service);
    }
}
