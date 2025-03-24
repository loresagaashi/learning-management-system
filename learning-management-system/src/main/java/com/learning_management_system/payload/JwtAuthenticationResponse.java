package com.learning_management_system.payload;

import com.learning_management_system.model.UserAccount;
import lombok.Data;
@Data
public class JwtAuthenticationResponse {

    private String accessToken;

    private String refreshToken;

    private UserAccount user;

    public JwtAuthenticationResponse(UserAccount user, String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }

}