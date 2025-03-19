package com.learning_management_system.model;

import com.learning_management_system.enums.PaymentMethod;
import com.learning_management_system.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "payments")
public class Payment extends BaseAuditEntity{

    //TODO  studentin
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "student_id")
//    private Student student;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

}
