// package com.learning_management_system.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(
//                     "/swagger-ui/**", 
//                     "/v3/api-docs/**", 
//                     "/v3/api-docs.yaml"
//                 ).permitAll() // Allow Swagger without authentication
//                 .anyRequest().authenticated()
//             )
//             .csrf().disable(); // Disable CSRF for APIs

//         return http.build();
//     }
// }


