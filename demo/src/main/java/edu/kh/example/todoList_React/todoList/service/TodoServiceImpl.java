package edu.kh.example.todoList_React.todoList.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.example.todoList_React.todoList.mapper.TodoMapper;
import edu.kh.example.todoList_React.todoList.model.dto.Todo;

@Service
public class TodoServiceImpl implements TodoService{
	
		
	@Autowired
	private TodoMapper mapper;
	
	@Override
	public List<Todo> selectAll() {
		return mapper.selectAll();
	}	
	@Override
	public int insertTodo(Todo todo) {
		return mapper.insertTodo(todo);
	}
	@Override
	public int updateComplete(Map<String, Object> paramMap) {
		return mapper.updateComplete(paramMap);
	}
	@Override
	public int deleteTodo(int todoNo) {
		return mapper.deleteTodo(todoNo);
	}
}
