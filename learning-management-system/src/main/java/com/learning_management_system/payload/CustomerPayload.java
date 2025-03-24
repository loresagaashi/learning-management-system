package com.learning_management_system.payload;

import java.time.LocalDate;

public class CustomerPayload {
      private LocalDate birthDate;

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}
