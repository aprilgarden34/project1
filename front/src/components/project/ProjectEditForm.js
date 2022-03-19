/*
  Edit 컴퍼넌트는 Project 컴퍼넌트의 하위 컴퍼넌트로 편집기능을 담당한다.
  IsEditing 변수가 true일때 작동하는데 기본값은 false로 처음에는 메인화면으로 나오다가
  Card 컴퍼넌트에서 편집버튼이 눌렸을 때 작동한다. 
  
  여기서 currentProject 값은 상위의 컴퍼넌트인 Projects 컴퍼넌트에서 내려온 값으로 
  map함수의 매개변수이며 서버에서 받아온 정보들의 합인 Projects 객체의 각가의 요소이다.(project)
  
  편집기능은 편집 버튼이 눌린 Project 컴퍼넌트 내에서만 작동하므로 project값으로 작동해야함. 

*/

import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [projectName, setTitle] = useState(currentProject.projectName);
  const [projectDesc, setDescription] = useState(currentProject.projectDesc);
  const [fromDate, setFromDate] = useState(new Date(currentProject.projectStart));
  const [toDate, setToDate] = useState(new Date(currentProject.projectEnd));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentProject의 user_id를 userId 변수에 할당함.
    const userId = currentProject.userId;
    const projectStart = fromDate.toISOString().split("T")[0];
    const projectEnd = toDate.toISOString().split("T")[0];

    // "projects/프로젝트id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      userId,
      projectName,
      projectDesc,
      projectStart,
      projectEnd,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", userId);
    // projects를 response의 data로 세팅함. 새로 편집한 정보까지 포함 업데이트.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.(메인화면 모드)
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectEditTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={projectName}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="projectEditDescription" className="mt-3">
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;