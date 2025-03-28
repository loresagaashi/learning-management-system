package com.learning_management_system.service.authentication;

import com.learning_management_system.data.UserView;
import com.learning_management_system.exception.NotFoundApiException;
import com.learning_management_system.model.Admin;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.model.UserAccount;
import com.learning_management_system.repository.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Override
    public UserAccount loadUserByUsername(String email) throws UsernameNotFoundException {
        // First check if it's an admin
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return admin.get();
        }

        // Then check if it's a professor
        Optional<Professor> professor = professorRepository.findByEmail(email);
        if (professor.isPresent()) {
            return professor.get();
        }

        // Finally, check if it's a student
        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isPresent()) {
            return student.get();
        }

        // If none are found, throw an exception
        throw new UsernameNotFoundException("User with email '" + email + "' not found!");
    }

    public UserAccount loadUserById(Long id) {
        // Check if it's an admin by ID
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return admin.get();
        }

        // Check if it's a student by ID
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return student.get();
        }

        // Check if it's a professor by ID
        Optional<Professor> professor = professorRepository.findById(id);
        if (professor.isPresent()) {
            return professor.get();
        }

        // If no user is found, throw an exception
        throw new UsernameNotFoundException("User not found with id : " + id);
    }
    public UserView myProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String methodName = "getUser";
        log.info("{} -> Get User by Id", methodName);

        Optional<UserAccountProjection> optionalUser = userAccountRepository.findByEmail(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            UserAccountProjection user = optionalUser.get();
            return new UserView(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getBirthDate()
            );
        } else {
            throw new NotFoundApiException(HttpStatus.NOT_FOUND);
        }
    }


}