package edu.kh.example.todoList_React.todoList.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.example.todoList_React.todoList.mapper.ApiMapper;
import edu.kh.example.todoList_React.todoList.model.dto.ApiDto;
import lombok.RequiredArgsConstructor;

@Service
public interface ApiService {

	public List<ApiDto> getAllServices();

}
