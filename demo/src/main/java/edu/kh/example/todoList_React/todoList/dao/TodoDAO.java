package edu.kh.example.todoList_React.todoList.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.example.todoList_React.todoList.mapper.TodoMapper;

@Repository 
public class TodoDAO {

	@Autowired // 의존성주입(DI) -> 같은 타입 + 상속 관계 Bean을 의존성 주입(DI)
	private TodoMapper mapper; // mapper에는 TodoMapper의 구현체가 의존성 주입됨
							   // 그 구현체가 sqlSessionTemplate 이용

	
}
