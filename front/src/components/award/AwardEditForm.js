import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ portfolioOwnerId, currentAward, setAwards, setIsEditing }) {
  //awardName 상태를 생성
  const [awardName, setAwardName] = useState(currentAward.awardName);
  //awardDesc 상태를 생성
  const [awardDesc, setAwardDesc] = useState(currentAward.awardDesc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // 수정한 내용을 "awards/수상 id" 엔드포인트로 PUT 요청
    // 에러처리 추가
    try { 
      await Api.put(`awards/${currentAward.id}`, {
      portfolioOwnerId,
      awardName,
      awardDesc,
    });} catch (err) {
      console.log('post 요청이 실패했습니다.', err)
    }

    // 수정후 "awardlist/유저id" 엔드포인트로 GET 요청하여 다시 받아옴.
    // 에러처리 추가
    const res = await Api.get("awardlist", portfolioOwnerId);
    if (!res) {
      console.log('get 요청이 실패했습니다')
    }
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집완료(추가끝남) isEditing을 false로 바꿔줌
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group >
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={awardName}
          onChange={(e) => setAwardName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
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
