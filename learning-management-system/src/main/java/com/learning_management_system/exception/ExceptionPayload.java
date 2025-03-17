package com.learning_management_system.exception;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExceptionPayload {

  private String fieldName;

  private Object rejectedValue;

  private String message;

  private String code;

  private Map<String, ExceptionPayload> map = new HashMap<>();

  @JsonAnySetter
  public void add(String key, ExceptionPayload value) {
    map.merge(key, value, ExceptionPayload::mergeValues);
  }

  @JsonAnyGetter
  public Map<String, ?> getMap() {
    return map;
  }

  public static ExceptionPayload mergeValues(ExceptionPayload exceptionPayload1, ExceptionPayload exceptionPayload2) {
    if (!exceptionPayload2.getFieldName().contains(".")) {
      return exceptionPayload1;
    }

    ExceptionPayload ep = exceptionPayload1.getFieldName() == null ? exceptionPayload1 : new ExceptionPayload();

    if (exceptionPayload1.getFieldName() != null) {
      String fieldName1 = exceptionPayload1.getFieldName().substring(exceptionPayload1.getFieldName().indexOf(".") + 1);
      exceptionPayload1.setFieldName(fieldName1);
      ep.add(fieldName1, exceptionPayload1);
    }

    String fieldName2 = exceptionPayload2.getFieldName().substring(exceptionPayload2.getFieldName().indexOf(".") + 1);
    exceptionPayload2.setFieldName(fieldName2);
    ep.add(fieldName2, exceptionPayload2);

    return ep;
  }

}
