package com.learning_management_system.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EntityValidationException extends RuntimeException {

  private ExceptionPayload exceptionPayload;

}
