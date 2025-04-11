package com.learning_management_system.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.learning_management_system.model.*;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDbInitializer {

   @Bean
   CommandLineRunner init(MongoTemplate mongoTemplate){
      return args -> {

         if (!mongoTemplate.collectionExists(Log.class)) {
            mongoTemplate.createCollection(Log.class);
         }
         if (!mongoTemplate.collectionExists(Report.class)) {
            mongoTemplate.createCollection(Report.class);
         }
         if (!mongoTemplate.collectionExists(Notification.class)) {
            mongoTemplate.createCollection(Notification.class);
         }
         if (!mongoTemplate.collectionExists(Message.class)) {
            mongoTemplate.createCollection(Message.class);
         }
         if (!mongoTemplate.collectionExists(Material.class)) {
            mongoTemplate.createCollection(Material.class);
         }
      };
   }
}