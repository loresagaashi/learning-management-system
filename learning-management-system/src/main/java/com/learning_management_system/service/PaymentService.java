package com.learning_management_system.service;

import com.learning_management_system.model.Payment;
import com.learning_management_system.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends BasicServiceOperations<PaymentRepository, Payment>{
    protected PaymentService(PaymentRepository repository) {
        super(repository);
    }
}
