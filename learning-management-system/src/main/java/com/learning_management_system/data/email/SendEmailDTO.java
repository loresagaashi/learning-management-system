package com.learning_management_system.data.email;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendEmailDTO {
    @NonNull
    private String to;
    @NonNull
    private String subject;
    @NonNull
    private String body;
}
