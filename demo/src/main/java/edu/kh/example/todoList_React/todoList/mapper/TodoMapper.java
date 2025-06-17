package edu.kh.example.todoList_React.todoList.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.example.todoList_React.todoList.model.dto.Todo;

@Mapper
public interface TodoMapper {

	List<Todo> selectAll();

	int insertTodo(Todo todo);	

	int deleteTodo(int todoNo);

	int updateComplete(Map<String, Object> paramMap);

}
