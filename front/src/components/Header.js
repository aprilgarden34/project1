import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import * as Api from "../api";

function Header() {
 
//---------------------- 모달 관련 기능 ------------------

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <>
    <Nav activeKey={location.pathname}
      style={{ 
        verticalAlign: "middle",       
        backgroundColor: '#D9D7F1',
        fontSize: '30px',
        fontColor: 'black'
      }}
    >
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>My Portfolio</Nav.Link>

      <Nav.Item>
      </Nav.Item>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleShow}>
         Withdraw
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>Network</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>Logout</Nav.Link> 
        </Nav.Item>
      )}
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/")}>My page</Nav.Link>
      </Nav.Item>
    
    </Nav>
  

    {/* 모달 컴퍼넌트 기능 */}

    <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>주의하세요!</Modal.Title>
    </Modal.Header>
    <Modal.Body>한번 탈퇴하면 돌이킬수 없습니다!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick= {
        () => { 
          Api.delete("user/remove")
          logout()}}>
        탈퇴
      </Button>
      <Button variant="primary" onClick={handleClose}>
        취소
      </Button>
    </Modal.Footer>
      </Modal>
    </>  
   
  );
}

export default Header;
