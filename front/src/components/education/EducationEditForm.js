import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ portfolioOwnerId, currentEducation, setEducations, setIsEditing }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState(currentEducation.school);
  //useState로 major 상태를 생성함.
  const [major, setMajor] = useState(currentEducation.major);
  //useState로 position 상태를 생성함.
  const [position, setPosition] = useState(currentEducation.position);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    // 수정한 교육사항을 "educations/교육id" 엔드포인트로 PUT 요청함.
    // 에러처리 추가
    try {
      await Api.put(`educations/${currentEducation.id}`, {
        portfolioOwnerId,
        school,
        major,
        position,
      });
    } catch (err) {
      console.log('post 요청이 실패했습니다.', err)
    }

    // 수정 후 "education/유저id" 엔드포인트로 GET 요청하여 받아옴
    // 에러처리 추가
    const res = await Api.get("education", portfolioOwnerId);
    //요청 실패시 error 반환
    if (!res) {
      console.log('get 요청시 에러가 발생했습니다.')
    }
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝난 후, isEditing을 false로 세팅함.
    setIsEditing(false);
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

    <div className="mb-3 mt-3">
      <Form.Check
        inline
        label="재학중"
        id="radio-edit-1"
        type="radio"
        name="position"
        value="재학중"
        checked={position === "재학중"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        label="학사졸업"
        id="radio-edit-2"
        type="radio"
        name="position"
        value="학사졸업"
        checked={position === "학사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        label="석사졸업"
        id="radio-edit-3"
        type="radio"
        name="position"
        value="석사졸업"
        checked={position === "석사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        label="박사졸업"
        id="radio-edit-4"
        type="radio"
        name="position"
        value="박사졸업"
        checked={position === "박사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />
    </div>

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

export default EducationEditForm;

