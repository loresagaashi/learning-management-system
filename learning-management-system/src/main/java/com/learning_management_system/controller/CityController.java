package com.learning_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning_management_system.model.City;
import com.learning_management_system.service.CityService;

@RestController
@RequestMapping("/cities")
public class CityController extends BasicControllerOperations<CityService,City>{

   public CityController(CityService service){
      super(service);
   }

}