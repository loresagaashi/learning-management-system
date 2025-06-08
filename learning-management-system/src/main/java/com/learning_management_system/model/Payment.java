package com.learning_management_system.model;

import com.learning_management_system.enums.PaymentMethod;
import com.learning_management_system.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Payment extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = true, foreignKey = @ForeignKey(name = "fk_payment_student", foreignKeyDefinition = "FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE RESTRICT"))
    private Student student;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

}
