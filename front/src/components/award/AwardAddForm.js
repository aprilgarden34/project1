import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  //awardName 상태를 생성
  const [awardName, setAwardName] = useState("");
  //awardDesc 상태를 생성
  const [awardDesc, setAwardDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 추가해주기위해 "award/create" 엔드포인트로 post요청함.
    // api 에러 핸들링 추가: awardName과 awardDesc 중 하나라도 공란일 경우
    if (awardName && awardDesc == null) {
      console.log('수상명과 수상내역을 입력해주세요.')
    } else{
      try {
        await Api.post("award/create", {
        portfolioOwnerId,
        awardName,
        awardDesc,
      });
      } catch (err) {
        console.log('post 요청시 에러가 발생했습니다.', err);
      }
    }    

    // 추가해줬으니 다시 "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", portfolioOwnerId);
    //요청 실패시 error 반환
    if (!res) {
      console.log('get 요청시 에러가 발생했습니다.')
    }
    // awards를 response의 data로 세팅.
    setAwards(res.data);
    // isAdding을 false로 세팅함.(편집이 끝남)
    setIsAdding(false);
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

export default AwardAddForm;
