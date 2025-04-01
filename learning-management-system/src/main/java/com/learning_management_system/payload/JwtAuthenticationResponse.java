package com.learning_management_system.payload;

import java.text.SimpleDateFormat;

import com.learning_management_system.model.UserAccount;
import lombok.Data;
import java.util.Date;

@Data
public class JwtAuthenticationResponse {

    private String accessToken;
    private String refreshToken;
    private UserAccount user;
    private String expirationTime; // Add expiration time field

    // Constructor including expiration time
    public JwtAuthenticationResponse(UserAccount user, String accessToken, String refreshToken, String expirationTime) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
        this.expirationTime = expirationTime; // Set expiration time
    }

}
