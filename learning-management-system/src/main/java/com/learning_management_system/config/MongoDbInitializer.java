package com.learning_management_system.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.learning_management_system.model.*;
import com.learning_management_system.repository.*;

@Configuration
public class MongoDbInitializer {

   @Bean
   CommandLineRunner init(
         LogRepository logRepository,
         ReportRepository reportRepository,
         NotificationRepository notificationRepository,
         MessageRepository messageRepository,
         MaterialRepository materialRepository){
      return args -> {
         logRepository.save(new Log());
         reportRepository.save(new Report());
         notificationRepository.save(new Notification());
         messageRepository.save(new Message());
         materialRepository.save(new Material());
      };
   }
}
