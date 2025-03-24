package com.learning_management_system.controller.authentication;
import com.learning_management_system.model.UserAccount;
import com.learning_management_system.payload.JwtAuthenticationResponse;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.payload.RefreshTokenPayload;
import com.learning_management_system.repository.AdminRepository;
import com.learning_management_system.security.jwt.JwtTokenProvider;
import com.learning_management_system.service.authentication.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AdminRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginPayload loginRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            String refreshedToken = tokenProvider.generateRefreshToken(authentication);
            return ResponseEntity.ok(new JwtAuthenticationResponse((UserAccount) authentication.getPrincipal(), jwt, refreshedToken));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenPayload refreshTokenPayload) {
        String refreshToken = refreshTokenPayload.getRefreshToken();
        if(tokenProvider.validateToken(refreshToken)) {
            String username = tokenProvider.getUserFromToken(refreshToken);
            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            String newAccessToken = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new JwtAuthenticationResponse((UserAccount) userDetails, newAccessToken, refreshToken));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

}