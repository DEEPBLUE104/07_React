package edu.kh.example.todoList_React.todoList.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.example.todoList_React.todoList.model.dto.ApiDto;
import edu.kh.example.todoList_React.todoList.service.ApiService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ApiServiceController {

    private final ApiService apiService;

    @GetMapping
    public List<ApiDto> getAllServices() {
        return apiService.getAllServices();
    }
    
  
}
