import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

// 편집 버튼 활성화는 isEditable이 true, setIsEditing(true)일 경우만 가능
function EducationCard({ educations, setEducations, education, isEditable, setIsEditing }) {
  
  const [image, setImage] = useState({ preview: '', data: '' })
  const [educationFilePath, setEducationFilePath] = useState(null);

  //삭제시 작동
  const handleDelete = async (e) => {
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

   // filepath를 (백엔드) DB에 저장하는 handleSubmit 이벤트핸들러
   const handleSubmit = async (e) => {
    e.preventDefault();

    const currentEducationId = education.id;
    console.log('education id:', education.id);

    const res = await Api.patch("education/saveFile", {
      educationId: currentEducationId,
      filePath: educationFilePath
    });
    
    console.log('저장된 값은 ', res.data);
    alert('백엔드에 이미지 파일이 저장되었습니다!')
  };

  // 업로드 UI 내용물이 바뀔 때 (백엔드) uploads 폴더에 저장하는 handleChange 이벤트핸들러
  const handleChange = async (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)

    const formData = new FormData();
    const uploadFile = e.target.files[0];
    formData.append("file", uploadFile);

    const res = await Api.filePost("education/uploadFile", formData);

    if (res.data.error === false) {
      return alert('5mb 이하의 이미지 형식 파일인지 확인해주세요!');
    } else {
      const fileInfo = {
        filePath: res.data.path,
        fileName: res.data.filename
      }
      console.log('백엔드에 저장된 데이터: ',fileInfo);
      setEducationFilePath(fileInfo.filePath);
    }   
  };    

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col className="text-center mb-4">
        <Form 
          encType="multipart/form-data" 
          style={{ display: 'flex' }}
          onSubmit={handleSubmit}
          >  
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>학력 파일을 업로드해주세요.</Form.Label>
            <Form>{image.preview && <img src={image.preview} alt="preview"width='100' height='100' />}</Form>            
            <Form.Control type="file" onChange={handleChange} /> 
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
              onClick={handleDelete}
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
