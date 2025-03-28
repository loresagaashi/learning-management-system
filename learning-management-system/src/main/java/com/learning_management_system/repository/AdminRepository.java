package com.learning_management_system.repository;

// import java.util.Optional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{
    Optional<Admin> findByEmail(String email);
}

