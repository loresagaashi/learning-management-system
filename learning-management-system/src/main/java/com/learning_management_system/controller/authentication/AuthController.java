package com.learning_management_system.controller.authentication;

import com.learning_management_system.data.user.ForgotPasswordRequestDTO;
import com.learning_management_system.data.user.ResetPasswordRequestDTO;
import com.learning_management_system.data.user.UserView;
import com.learning_management_system.model.UserAccount;
import com.learning_management_system.payload.JwtAuthenticationResponse;
import com.learning_management_system.payload.LoginPayload;
import com.learning_management_system.payload.RefreshTokenPayload;
import com.learning_management_system.repository.AdminRepository;
import com.learning_management_system.security.jwt.JwtTokenProvider;
import com.learning_management_system.service.authentication.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Log4j2
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AdminRepository userRepository;

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
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token
            String jwt = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            // Get formatted expiration time from JWT
            String expirationTime = tokenProvider.getFormattedExpirationTimeFromToken(jwt);

            // Return JWT with formatted expiration time
            return ResponseEntity.ok(new JwtAuthenticationResponse((UserAccount) authentication.getPrincipal(), jwt,
                    refreshToken, expirationTime));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenPayload refreshTokenPayload) {
        String refreshToken = refreshTokenPayload.getRefreshToken();
        if (tokenProvider.validateToken(refreshToken)) {
            String username = tokenProvider.getUserFromToken(refreshToken);
            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                    userDetails.getAuthorities());
            String newAccessToken = tokenProvider.generateToken(authentication);

            // Extract expiration time from new access token and format it
            String expirationTime = tokenProvider.getFormattedExpirationTimeFromToken(newAccessToken);

            return ResponseEntity.ok(new JwtAuthenticationResponse((UserAccount) userDetails, newAccessToken,
                    refreshToken, expirationTime));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @Operation(summary = "Get my profile", description = "Returns the profile details of the authenticated user")
    @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = UserView.class)))
    @GetMapping("/me")
    public ResponseEntity<UserView> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String methodName = "getMyProfile";

        log.info("{} -> Get My Profile", methodName);
        UserView userView = userDetailsServiceImpl.myProfile(userDetails);

        log.info("{} -> Get user, response status: 200", methodName);

        return ResponseEntity.status(HttpStatus.OK).body(userView);
    }
    // private String formatExpirationTime(long expirationTimeInMs) {
    // Date expirationDate = new Date(expirationTimeInMs);
    // SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    // return dateFormat.format(expirationDate); // Format to a readable date string
    // }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequestDTO request) throws MessagingException, IOException {
        userDetailsServiceImpl.sendPasswordResetCode(request.getEmail());
        return ResponseEntity.ok("Verification code sent to your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordRequestDTO request) {
        userDetailsServiceImpl.resetPassword(
                request.getEmail(),
                request.getVerificationCode(),
                request.getNewPassword(),
                request.getConfirmPassword()
        );
        return ResponseEntity.ok("Password changed successfully.");
    }

}
