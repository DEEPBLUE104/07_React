package edu.kh.example.todoList_React.todoList.model.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Todo {
	private int todoNo;            // 할 일 번호
    private String todoTitle;      // 할 일 제목
    private String todoDetail;     // 할 일 내용
    private int todoComplete;      // 완료 여부 (0:X, 1:O)
    private LocalDateTime regDate; // 등록일
}
