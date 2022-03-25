/*
  ProjectAddForm 컴퍼넌트는 Projects 하위 컴퍼넌트로 Projects 추가기능을 담당한다. 
  Projects 컴퍼넌트의 맨 밑에 (+)버튼이 눌릴시 isAdding이 true로 바뀌고 Add 컴퍼넌트가 작동한다.

*/

import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  
  const [projectName, setTitle] = useState("");
  const [projectDesc, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;
    const projectStart = fromDate.toISOString().split("T")[0];
    const projectEnd = toDate.toISOString().split("T")[0];

    // "project/create" 엔드포인트로 post요청함. 새롭게 추가된 프로젝트 관련 정보 서버 전달.
    await Api.post("project/create", {
      userId,
      projectName,
      projectDesc,
      projectStart,
      projectEnd,
    });

    // "projectlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", userId);
    // projects를 response의 data로 세팅함. 추가된 프로젝트 포함 전체 프로젝트 정보를 받아와서 업데이트.
    setProjects(res.data);
    // project를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함(메인 화면 모드)
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectAddTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={projectName}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="projectAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={projectDesc}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </Col>
      </Form.Group>

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

export default ProjectAddForm;
