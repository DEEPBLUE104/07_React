import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "../css/DashBoard.css";
import Statistics from "./Statistics";
import Manager from "./Manager";
import Restore from "./Restore";
import Chart from "./Chart";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import logo from "../assets/logo.jpg";

// react-router-dom : React 어플리케이션에서 라우팅을 구현하기 위해 사용하는 라이브러리
// 라우팅(Routing) : 사용자가 요청한 URL 경로에 따라 적절한 페이지나 리소스 제공하는 과정

export default function DashBoard() {
  const globalState = useContext(AuthContext); // AuthContext 코드 읽어오기
  const navigate = useNavigate();

  const goDashBoardMain = () => {
    // "/" 이동
    // location.href = "/"; 사용은 가능하나 권장 x
    // 브라우저의 기본동작을 이용해서 "새로고침하며 이동"하는 방식
    // 즉, 전체 페이지 리로드 (React의 SPA 철학 위배)
    navigate("/");
  };

  return (
    <div className="dash-board-container">
      <div className="dash-board-header">
        <button id="logo-btn" onClick={goDashBoardMain}>
          <img src={logo} />
        </button>
      </div>

      <div className="admin-info">
        <p>현재 접속 관리자 : {globalState.user.memberNickname}</p>
        <button onClick={globalState.handleLogout}>로그아웃</button>
      </div>

      {/* NavLink : 현재 URL이 to 속성과 일치하면 active 상태로 인식 
          해당 컴포넌트를 클릭하면 to="/경로" 경로로 아동
      */}

      <div className="router-tab-box">
        <NavLink to="/statistics">통계</NavLink>
        <NavLink to="/restore">복구</NavLink>
        <NavLink to="/manager">관리자 메뉴</NavLink>
      </div>

      {/* Route를 이용하여 각 URL에 맞게 컴포넌트 연결 */}
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/restore" element={<Restore />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </div>
  );
}
