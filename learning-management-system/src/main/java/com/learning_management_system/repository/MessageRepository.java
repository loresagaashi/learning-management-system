package com.learning_management_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
}