import { useState } from "react";
import "./default.css";

function App() {
  const [userList, setUserList] = useState([
    { name: "유저1", age: 24, gender: "남자", phone: "010-2732-2241" },
    { name: "유저2", age: 27, gender: "여자", phone: "010-2674-0093" },
    { name: "유저3", age: 30, gender: "남자", phone: "010-3784-2834" },
  ]);

  // 한국어가 아이냥...
  return (
    <div className="App">
      <h1>회원 정보 출력</h1>
      <hr></hr>
      <table className="member_tbl">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => {
            return (
              <User
                key={"user" + index}
                item={item}
                userList={userList}
                setUserList={setUserList}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const User = (props) => {
  const user = props.item;
  const userList = props.userList;
  const setUserList = props.setUserList;
  const deleteUser = () => {
    const newUserList = userList.filter((item) => {
      return item !== user;
    });
    setUserList(newUserList);
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td>
        <button onClick={deleteUser}>삭제하기</button>
      </td>
    </tr>
  );
};

export default App;
