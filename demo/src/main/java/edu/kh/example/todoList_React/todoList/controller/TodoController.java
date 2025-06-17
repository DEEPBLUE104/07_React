package edu.kh.example.todoList_React.todoList.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.example.todoList_React.todoList.model.dto.Todo;
import edu.kh.example.todoList_React.todoList.service.TodoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // React 개발 서버 허용
@RequestMapping("/todo")
public class TodoController {
	@Autowired
    private TodoService todoService;
	
	@GetMapping
    public List<Todo> getAllTodos() {
        return todoService.selectAll();
    }
	
	// 2. 등록
    @PostMapping
    public int insertTodo(@RequestBody Todo todo) {
        return todoService.insertTodo(todo);
    }
 // 3. 완료 여부 수정
    @PutMapping("/{todoNo}")
    public int updateComplete(@PathVariable("todoNo") int todoNo, @RequestBody Map<String, Object> body) {
        int todoComplete = (int) body.get("todoComplete");

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("todoNo", todoNo);
        paramMap.put("todoComplete", todoComplete);

        return todoService.updateComplete(paramMap);
    }
 // 4. 삭제
    @DeleteMapping("/{todoNo}")
    public int deleteTodo(@PathVariable("todoNo") int todoNo) {
        return todoService.deleteTodo(todoNo);
    }
	
}
