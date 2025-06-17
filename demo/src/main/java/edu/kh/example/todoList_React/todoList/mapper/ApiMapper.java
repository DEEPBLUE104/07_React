package edu.kh.example.todoList_React.todoList.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.example.todoList_React.todoList.model.dto.ApiDto;

@Mapper
public interface ApiMapper {

	List<ApiDto> getAllServices();

}
