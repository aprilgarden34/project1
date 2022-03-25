import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  
  const [certificateName, setCertificateName] = useState("");
  const [certificateDesc, setCertificateDesc] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId를 currentUserId 변수에 할당함.
    const currentUserId = portfolioOwnerId;
    const certificateDate = whenDate.toISOString().split("T")[0];


    // "certificate/create" 엔드포인트로 post요청함.
    await Api.post("certificate/create", {
      currentUserId: currentUserId,
      certificateName: certificateName,
      certificateDesc: certificateDesc,
      certificateDate: certificateDate,
    });


    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificatelist", currentUserId);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="certificateAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={certificateDesc}
          onChange={(e) => setCertificateDesc(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
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

export default CertificateAddForm;
