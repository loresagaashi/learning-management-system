package com.learning_management_system.repository;

import java.time.LocalDate;

public interface UserAccountProjection {
    String getFirstName();
    String getLastName();
    String getEmail();
    String getPhoneNumber();
    LocalDate getBirthDate();
}
