package com.learning_management_system.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.learning_management_system.exception.EntityValidationException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class BasicMongoServiceOperations<R extends MongoRepository<E, String>, E> {

   protected final R repository;

   public E save(E entity) {
      validateEntity(entity);
      return repository.save(entity);
   }

   public E findById(String id) {
      return repository.findById(id).orElse(null);
   }

   public List<E> findByIds(Set<String> ids) {
      return repository.findAllById(ids);
   }

   public List<E> findAll() {
      return repository.findAll();
   }

   public void deleteById(String id) {
      repository.deleteById(id);
   }

   protected void validateEntity(E entity) throws EntityValidationException {
   }
}
