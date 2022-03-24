import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

//등록된 Award 전체를 보여줌
// 편집 클릭시 isEditing = true
function AwardCard({ awards, setAwards, award, isEditable, setIsEditing }) {
  const [ awardImage, setAwardImage ] = useState(null)
  
  // 삭제시 작동
  const DeleleteHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.delete("awards", award.id);
    } catch (err) {
      console.log("삭제 중 에러가 발생했습니다.", err);
    }
    setAwards((e) => {
      const delAward = e.filter((v) => v.id !== award.id);
        alert("정말 삭제하시겠습니까? 확인버튼을 누르시면 데이터는 복구되지 않습니다.")
        return delAward;    
    });
  };

  //파일업로드시 작동
  const SubmitHandler = async (e) => {       
    e.preventDefault();
       
    const formData = new FormData();
    formData.append("file", awardImage);
    const res = await Api.formPost("award/image", formData);

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
            <Form.Label>수상이력 파일을 업로드해주세요.</Form.Label>            
            <Form.Control type="file" onChange={(e) => setAwardImage(e.target.files[0])} /> 
            <Form.Control type="submit" />           
          </Form.Group>
        </Form>       
          <span className= "mb-4" style={{display: 'block'}}>{award.awardName}</span>
          <span className="text-muted" style={{display: 'block'}}>{award.awardDesc}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
              variant="outline-danger"              
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

export default AwardCard;
