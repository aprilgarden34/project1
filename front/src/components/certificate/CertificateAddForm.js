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

  //  -------- 파일 업로드; 데이터 세팅 ---------------

  const handleChange = async (e) => {

    e.preventDefault();

    // files 데이터 전달할 formData 생성
    const formData = new FormData();

    // UI에서 받은 files 데이터를 formData에 file 필드로 저장
    const uploadFile = e.target.files[0];
    formData.append("file", uploadFile);

    // 백엔드의 'certificate/uploadfile' URI로 formPost 요청 (참고. app.js 의 formPost)
    const res = await Api.formPost("upload", formData);

    if (res.data) {
      const fileInfo = {
        filePath: res.data.path,
        fileName: res.data.filename
      }
      console.log('백엔드에 저장된 데이터: ',fileInfo);
      
      alert('백엔드에 이미지 파일이 저장되었습니다!')
    }

  };

  // ----------------------------------------- 

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex' }}>

      <Form.Group controlId="certificateAddTitle" className="mt-3">
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

    {/* // 파일 업로드  */}
      <Form.Group controlId="formFileSm" className="mt-3">
        <Form.Control 
          type="file" 
          size="sm"
          name="photo"
          onChange={handleChange}
          />
      </Form.Group>
    {/* // 파일 업로드  */}

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
