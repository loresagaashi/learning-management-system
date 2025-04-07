package com.learning_management_system.repository;

import com.learning_management_system.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByEmailAndToken(String email, String token);

    void deleteByEmail(String email);

}