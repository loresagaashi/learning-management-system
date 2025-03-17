package com.learning_management_system.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.exception.EntityValidationException;
import com.learning_management_system.model.BaseEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class BasicServiceOperations<R extends JpaRepository<E, Long>, E extends BaseEntity> {

  protected final R repository;

  public E save(E entity) {
    validateEntity(entity);
    return repository.save(entity);
  }

  public E findById(Long id) {
    return repository.findById(id).orElse(null);
  }

  public List<E> findByIds(Set<Long> ids) {
    return repository.findAllById(ids);
  }

  public List<E> findAll() {
    return repository.findAll();
  }

  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  protected void validateEntity(E entity) throws EntityValidationException {}
}
