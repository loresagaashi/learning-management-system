package com.learning_management_system.service.authentication;

import com.learning_management_system.data.email.ReplacedWildCardsDTO;
import com.learning_management_system.data.email.SendEmailDTO;
import com.learning_management_system.data.user.UserView;
import com.learning_management_system.exception.NotFoundApiException;
import com.learning_management_system.model.*;
import com.learning_management_system.repository.*;
import com.learning_management_system.service.EmailService;
import com.learning_management_system.util.TemplateUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@Log4j2
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private  TemplateUtil templateUtil;
    @Autowired
    private  EmailService em;


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
                    user.getUserId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getBirthDate(),
                    user.getSemesterId()
            );
        } else {
            throw new NotFoundApiException(HttpStatus.NOT_FOUND);
        }
    }
    public void sendPasswordResetCode(String email) throws MessagingException, IOException {
        Optional<Student> studentOpt = studentRepository.findByEmail(email);
        Optional<Professor> professorOpt = professorRepository.findByEmail(email);

        if (studentOpt.isEmpty() && professorOpt.isEmpty()) {
            throw new IllegalArgumentException("Email not found");
        }

        Object user = studentOpt.isPresent() ? studentOpt.get() : professorOpt.get();

        String code = String.format("%06d", new Random().nextInt(999999));
        tokenRepository.deleteByEmail(email);

        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setToken(code);
        token.setCreatedAt(LocalDateTime.now());
        tokenRepository.save(token);

        Map<String, String> variables = emailService.replaceUserFields(user);
        variables.put("token", code);


        String bodyTemplatePath = "src/main/resources/templates/ChangePasswordTemplate.html";
        String bodyTemplate = new String(Files.readAllBytes(Paths.get(bodyTemplatePath)), StandardCharsets.UTF_8);

        ReplacedWildCardsDTO replacedWildCardsDTO = templateUtil.getReplacedWildCards(
                variables,
                "Password Reset Request",
                bodyTemplate
        );

        // Send email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject(replacedWildCardsDTO.getSubject());
        helper.setText(replacedWildCardsDTO.getBody(), true);
        mailSender.send(message);
    }

    @Transactional
    public void resetPassword(String email, String code, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        Optional<Student> studentOpt = studentRepository.findByEmail(email);
        Optional<Professor> professorOpt = professorRepository.findByEmail(email);

        UserAccount user = null;

        if (studentOpt.isPresent()) {
            user = studentOpt.get();
        } else if (professorOpt.isPresent()) {
            user = professorOpt.get();
        } else {
            throw new EntityNotFoundException("No user found with this email");
        }

        PasswordResetToken token = tokenRepository.findByEmailAndToken(email, code)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired token"));

        if (token.isExpired()) {
            throw new IllegalArgumentException("Token expired");
        }
        if (!token.getToken().equals(code)) {
            throw new IllegalArgumentException("Invalid verification code");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        if (user instanceof Student ) {
            studentRepository.saveAndFlush((Student) user);
        }
        else if (user instanceof Professor) {
            professorRepository.saveAndFlush((Professor) user);
        }

        tokenRepository.delete(token);
    }

}