import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 major 상태를 생성함.
  const [major, setMajor] = useState("");
  //useState로 position 상태를 생성함.
  const [position, setPosition] = useState("재학중");
  //position을 저장하는 배열
  const positions = ["재학중", "학사 졸업", "석사 졸업", "박사 졸업"];
  //const [checked, setChecked] = useState("");

  const positionsHandler = (e, value) => {
    setPosition(value)    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가사항 입력을 위해 "education/create" 엔드포인트로 post요청함.
    // api 에러 핸들링 추가: school, major, position 중 하나라도 공란일 경우
    if (school && major && position == null) {
      console.log('학교, 전공, 학력을 입력해주세요.')
    } else{
      try {
        await Api.post("education/create", {
          portfolioOwnerId,
          school,
          major,
          position,
        });
      } catch (err) {
        console.log('post 요청시 에러가 발생했습니다.', err)
      }  
    }
    
    //추가 후 "educationlist/유저id" 엔드포인트로 get요청하여 받아옴
    const res = await Api.get("educationlist", portfolioOwnerId);
    //요청 실패시 error 반환
    if (!res) {
      console.log('get 요청시 에러가 발생했습니다.')
    }
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // education을 추가완료되어, isAdding을 false 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <div key={"inline-radio"} className="mb-3 mt-3">
      <Form.Group
          value={position}
          onChange={positionsHandler}         
        >
          {positions.map((position, i) => (
            <Form.Check
              inline  
              type="radio" 
              key={"position" + i}
              label={position}
              value={position}
              checked={position.i}            
            />     
          ))}                  
        </Form.Group>             
      </div>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
