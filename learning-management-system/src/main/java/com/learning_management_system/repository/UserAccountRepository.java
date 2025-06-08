package com.learning_management_system.repository;

import com.learning_management_system.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @Query(value = "SELECT id as userId, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, birth_date as birthDate , active_semester_id as semesterId FROM student WHERE email = :email " +
            "UNION " +
            "SELECT id as userId, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, birth_date as birthDate , NULL as semesterId FROM professor WHERE email = :email " +
            "UNION " +
            "SELECT id as userId, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, birth_date as birthDate , NULL as semesterId FROM admin WHERE email = :email",
            nativeQuery = true)
    Optional<UserAccountProjection> findByEmail(@Param("email") String email);


}
