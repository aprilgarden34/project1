import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
  portfolioOwnerId,
}) {
  
  const [certificateName, setTitle] = useState(currentCertificate.certificateName);
  const [certificateDesc, setCertificateDesc] = useState(currentCertificate.certificateDesc);
  const [whenDate, setWhenDate] = useState(new Date(currentCertificate.certificateDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUserId = portfolioOwnerId;
    const certificateDate = whenDate.toISOString().split("T")[0];

    await Api.put(`certificates/${currentCertificate.id}`, {
      currentUserId,
      certificateName,
      certificateDesc,
      certificateDate,
    });
    
    const res = await Api.get("certificatelist", currentUserId);
    setCertificates(res.data);
    // isEditing을 false로 세팅하여 메뉴 화면으로 돌림.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateEditTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={certificateName}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="certificateEditDescription" className="mt-3">
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

export default CertificateEditForm;
