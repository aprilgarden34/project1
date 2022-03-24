import { Card, Button, Row, Col, Form } from "react-bootstrap";
import React from "react";
import * as Api from "../../api";

function CertificateCard({ certificates, setCertificates, certificate, isEditable, setIsEditing }) {

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

    // 백엔드에서 에러 발생하는 경우, 예외처리
    if (res.data.error === false) {
      alert('error : 이미지 형식 파일인지 확인해주세요!');
    } else {

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
    <Card.Text>
      <Row className="align-items-center">
        <Col xs lg="1">
          <div></div>
        </Col>
        <Col>    
          <div className="text-center"> 
            {certificate.certificateName}
            <br />
            <span className="text-muted">{certificate.certificateDesc}</span>
            <br />
            <span className="text-muted">{certificate.certificateDate}</span>    
          </div>
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
        </Col>
        {isEditable && (
            <Col xs lg="1">
              <div className="d-grid gap-2">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)} //editing 모드를 편집상태로 전환!
                  className="mr-3"
                >편집
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="mr-3"
                  onClick={() => {
                                 const index = certificates.indexOf(certificate)              
                                 certificates.splice(index, 1)
                                 const newCertificates = [...certificates]
                                 setCertificates(newCertificates)        
                                 Api.delete("certificates", certificate.id )      
                                }
                            }
                  >삭제
                </Button>
              </div>
            </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
