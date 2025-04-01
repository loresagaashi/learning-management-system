package com.learning_management_system.util;

import com.learning_management_system.data.email.ReplacedWildCardsDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.Map;

@Log4j2
@Component
public class TemplateUtil {

    public ReplacedWildCardsDTO getReplacedWildCards(Map<String,String> variables, String subject, String body){
        boolean subjectContainsWildcard = subject.contains("#");
        if (body != null) {
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                try {
                    body = body.replace("#" + entry.getKey() + "#", entry.getValue());
                    if (subjectContainsWildcard) {
                        subject = subject.replace("#" + entry.getKey() + "#", entry.getValue());
                    }
                } catch (NullPointerException e) {
                    //do nothing,
                }
            }
        }

        return new ReplacedWildCardsDTO(subject,body);
    }
}