import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

// 편집 버튼 활성화는 isEditable이 true, setIsEditing(true)일 경우만 가능
function EducationCard({ educations, setEducations, education, isEditable, setIsEditing }) {
  const [ educationImage, setEducationImage ] = useState(null)

  //삭제시 작동
  const DeleleteHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.delete("educations", education.id);
    } catch (err) {
      console.log("삭제 중 에러가 발생했습니다.", err);
    }
    setEducations((e) => {
      const delEdu = e.filter((v) => v.id !== education.id);
      alert("정말 삭제하시겠습니까? 확인버튼을 누르시면 데이터는 복구되지 않습니다.")
      return delEdu;
    });
  };

  //파일업로드시 작동
  const SubmitHandler = async (e) => {       
    e.preventDefault();
       
    const formData = new FormData();
    formData.append("file", educationImage);
    const res = await Api.formPost("education/image", formData);

    if (res.data) {
      const fileInfo = {
        filePath: res.data.path,
        fileName: res.data.filename
      }
      console.log('백엔드에 저장된 데이터: ',fileInfo);      
      alert('백엔드에 이미지 파일이 저장되었습니다!')
    } 
  };
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col className="text-center mb-4">
        <Form 
          encType="multipart/form-data" 
          style={{ display: 'flex' }}
          onSubmit={SubmitHandler}
          >  
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>학력 파일을 업로드해주세요.</Form.Label>            
            <Form.Control type="file" onChange={(e) => setEducationImage(e.target.files[0])} /> 
            <Form.Control type="submit" />           
          </Form.Group>
        </Form>
        <span className= "mb-4">{education?.school}</span>          
        <span className="text-muted" style={{display: 'block'}}>
            {education?.major}
            ({education?.position})
          </span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <div className="d-grid gap-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-3"
            > 
              편집             
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              onClick={DeleleteHandler}
              className="mr-3"
            >
              삭제
            </Button>
            </div>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
