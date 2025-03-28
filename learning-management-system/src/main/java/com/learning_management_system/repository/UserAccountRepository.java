package com.learning_management_system.repository;

import com.learning_management_system.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @Query(value = "SELECT first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, birth_date as birthDate FROM student WHERE email = :email " +
            "UNION " +
            "SELECT first_name, last_name, email, phone_number, birth_date FROM professor WHERE email = :email " +
            "UNION " +
            "SELECT first_name, last_name, email, phone_number, birth_date FROM admin WHERE email = :email",
            nativeQuery = true)
    Optional<UserAccountProjection> findByEmail(@Param("email") String email);


}
