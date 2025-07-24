import { useState, useEffect } from "react";
import { axiosApi } from "../api/axiosApi";
import axios from "axios";
import "/src/TodoList.css";

export default function TodoList() {
  const [todoListForm, setTodoListForm] = useState([]);
  // 해당 목록은 list 하나로 받아와야 한다!

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 팝업창 노출
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // 완료 바꾸기
  const YNhandler = async (todo) => {
    try {
      const resp = await axiosApi.put("/admin/YNhandler", {
        todoNo: todo.todoNo,
      });
      selectTodoList();
    } catch (error) {
      console.log("yn데이터 오류");
    }
  };

  // 삭제
  const deleteTodo = async (popupData) => {
    try {
      const resp = await axiosApi.delete("/admin/deleteTodo", {
        data: { todoNo: popupData.todoNo },
      });

      console.log("삭제성공");
      selectTodoList();
    } catch (error) {
      console.log("삭제 실패");
      console.log(error);
    }
  };

  useEffect(() => {
    selectTodoList();
  }, []);

  async function selectTodoList() {
    try {
      const response = await axiosApi.get("/admin/selectTodoList");
      console.log(response);

      if (response.status === 200) {
        setTodoListForm(response.data); // 배열로 받아야 함
      }
    } catch (error) {
      alert(error.response?.data || "에러 발생");
    }
  }

  // form 에서 값 가져오기
  const setTodoList = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 불러온 값 서버로 보내기
  async function addTodoList() {
    const { title, content } = form;

    if (title.length === 0 || content.length === 0) {
      alert("모든 필드를 입력해주세요");
      return;
    }

    try {
      const resp = await axiosApi.post("/admin/addTodoList", {
        todoTitle: title,
        todoContent: content,
      });

      if (resp.status === 201) {
        const result = resp.data;
        console.log("성공");
        selectTodoList();
        setForm({
          title: "",
          content: "",
        });
      }
    } catch (error) {
      alert(error.response?.data || "에러 발생");
    }
  }

  return (
    <div className="manager-div">
      <h3>할 일 추가</h3>
      <div>
        제목 :{" "}
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={setTodoList}
        />
      </div>
      <hr />
      <div>
        <textarea
          id="content"
          cols="50"
          rows="5"
          placeholder="상세 내용"
          value={form.content}
          onChange={setTodoList}
        ></textarea>
      </div>

      <button id="addBtn" onClick={addTodoList}>
        추가 하기
      </button>

      <h3 id="todoHeader">
        전체 Todo 개수 : <span id="totalCount">0</span> 개 / 완료된 Todo 개수 :{" "}
        <span id="completeCount">0</span> 개
        <button id="reloadBtn" onClick={selectTodoList}>
          새로고침
        </button>
      </h3>
      <table border="1">
        <thead>
          <tr>
            <th>행 번호</th>
            <th>할 일 번호</th>
            <th>할 일 제목</th>
            <th>완료 여부</th>
            <th>등록 날짜</th>
          </tr>
        </thead>

        <tbody>
          {todoListForm.map((todo, index) => (
            <tr key={todo.todoNo}>
              <td>{index + 1}</td>
              <td>{todo.todoNo}</td>
              <td
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => {
                  setPopupData(todo);
                  setPopupVisible(true);
                }}
              >
                {todo.todoTitle}
              </td>
              <td>{todo.complete ? "Y" : "N"}</td>
              <td>{todo.regDate}</td>
              <td>
                <button onClick={() => YNhandler(todo)}>완료 수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupVisible && popupData && (
        <div className="popup-layer">
          <div className="popup-row">
            번호 : <span>{popupData.todoNo}</span> | 제목 :{" "}
            <span>{popupData.todoTitle}</span>
            <span
              style={{ cursor: "pointer", float: "right", fontWeight: "bold" }}
              onClick={() => setPopupVisible(false)}
            >
              &times;
            </span>
          </div>
          <div className="popup-row">
            완료 여부 : <span>{popupData.complete ? "Y" : "N"}</span> | 등록일 :{" "}
            <span>{popupData.regDate}</span>
          </div>
          <div className="popup-row">
            [내용]
            <div>{popupData.todoContent}</div>
          </div>

          <button onClick={() => deleteTodo(popupData)}>삭제</button>
        </div>
      )}
    </div>
  );
}
