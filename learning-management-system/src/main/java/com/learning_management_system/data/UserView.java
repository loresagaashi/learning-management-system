package com.learning_management_system.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserView {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;

}
