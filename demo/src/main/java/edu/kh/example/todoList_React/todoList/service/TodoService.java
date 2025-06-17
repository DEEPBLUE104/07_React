package edu.kh.example.todoList_React.todoList.service;

import java.util.List;
import java.util.Map;

import edu.kh.example.todoList_React.todoList.model.dto.Todo;

public interface TodoService {

	List<Todo> selectAll();

	int insertTodo(Todo todo);	

	int deleteTodo(int todoNo);

	int updateComplete(Map<String, Object> paramMap);

}
