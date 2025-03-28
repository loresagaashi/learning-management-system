package com.learning_management_system.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.exception.ExceptionPayload;
import com.learning_management_system.model.Admin;
import com.learning_management_system.repository.AdminRepository;

@Service
public class AdminService extends BasicServiceOperations<AdminRepository, Admin> {

   private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Admin> findByEmail(String email) {
        return this.repository.findByEmail(email);
    }

    @Override
    public Admin save(Admin entity) {
        if (entity.getId() == null) {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        }

        return super.save(entity);
    }
    private final BCryptPasswordEncoder passwordEncoder1 = new BCryptPasswordEncoder();

    public Admin login(String email, String password) {
        Admin admin = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!passwordEncoder1.matches(password, admin.getPassword())) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return admin;
    }
}
