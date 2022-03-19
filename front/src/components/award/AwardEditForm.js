import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ portfolioOwnerId,  currentAward, setAwards, setIsEditing }) {
  //awardName 상태를 생성
  const [awardName, setAwardName] = useState(currentAward.awardName);
  //awardDesc 상태를 생성
  const [awardDesc, setAwardDesc] = useState(currentAward.awardDesc);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentAward의 user_id를 user_id 변수에 할당
    const user_id = portfolioOwnerId;

    // 수정한 내용을 "awards/수상 id" 엔드포인트로 PUT 요청
    await Api.put(`awards/${currentAward.id}`, {
      user_id,
      awardName,
      awardDesc,
    });

    // 수정후 "awardlist/유저id" 엔드포인트로 GET 요청하여 다시 받아옴.
    const res = await Api.get("awardlist", user_id);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집완료(추가끝남) isEditing을 false로 바꿔줌
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditAwardName">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={awardName}
          onChange={(e) => setAwardName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardEditAwardDesc" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={awardDesc}
          onChange={(e) => setAwardDesc(e.target.value)}
        />
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

export default AwardEditForm;
