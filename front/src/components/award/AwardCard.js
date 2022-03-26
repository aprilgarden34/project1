import React, { useState } from "react";
import { Modal, Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

//등록된 Award 전체를 보여줌
// 편집 클릭시 isEditing = true
function AwardCard({ awards, setAwards, award, isEditable, setIsEditing }) {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [awardFilePath, setAwardFilePath] = useState(null);
  const [previewMode, setPreviewMode] = useState(false)


// 모달 관련 기능 ------------------

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  // 삭제시 작동
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await Api.delete("awards", award.id);
    } catch (err) {
      console.log("삭제 중 에러가 발생했습니다.", err);
    }
    setAwards((e) => {
      const delAward = e.filter((v) => v.id !== award.id);
        return delAward;    
    });
  };

  // (프론트) filepath를 (백엔드) DB에 저장하는 handleSubmit 이벤트핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentAwardId = award.id;
    console.log('award id:', award.id);

    const res = await Api.patch("award/saveFile", {
      awardId: currentAwardId,
      filePath: awardFilePath
    });
    
    console.log('저장된 값은 ', res.data);
    alert('백엔드에 이미지 파일이 저장되었습니다!')

    setPreviewMode(true) // 미리보기 모드로 전환

  };

  // (프론트) 업로드 UI 내용물이 바뀔 때 (백엔드) uploads 폴더에 저장하는 handleChange 이벤트핸들러
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

    const res = await Api.filePost("award/uploadFile", formData);

    if (res.data.error === false) {
      return alert('5mb 이하의 이미지 형식 파일인지 확인해주세요!');
    } else {
      const fileInfo = {
        filePath: res.data.path,
        fileName: res.data.filename
      }
      console.log('백엔드에 저장된 데이터: ',fileInfo);

      setAwardFilePath(fileInfo.filePath);
    }   
  };    

  return (
  <>
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
      {isEditable ?  
        <>
        <Col sm={4} className="text-center mb-4">
          <Form 
            encType="multipart/form-data" 
            onSubmit={handleSubmit}
            > 
            <Form.Group controlId="formFile" className="mb-3"> 
            {previewMode ? <Form>{image.preview && <img src={image.preview} alt="preview"width='120' height='160' />}</Form> 
              :<>
              <Form>{image.preview && <img src={image.preview} alt="preview"width='100' height='100' />}</Form>           
              <Form.Control type="file" onChange={handleChange} /> 
              <Form.Control type="submit" />
              </>}           
            </Form.Group>
          </Form>   
        </Col>
        <Col sm={4}>
          <div style={{lineHeight: '8px'}} > 
            <p>{award.awardName}</p>
            <p>{award.awardDesc}</p>
          </div>
        </Col>
          <Col sm={1}>
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
              onClick={handleShow}
              className="mr-3"
            >
              삭제
            </Button>
            </div>
          </Col >
        </>
        : <Col span={20}>
            <div style={{lineHeight: '8px'}} > 
              <p>{award.awardName}</p>
              <p>{award.awardDesc}</p>
            </div>
          </Col>    
      }
      </Row>
    </Card.Text>
 
   {/* 모달 컴퍼넌트 기능 */}

   <Modal show={show} onHide={handleClose} animation={false}>
   <Modal.Header closeButton>
     <Modal.Title>주의하세요!</Modal.Title>
   </Modal.Header>
   <Modal.Body>한번 삭제하면 돌이킬수 없습니다!</Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleDelete}>
       삭제
     </Button>
     <Button variant="primary" onClick={handleClose}>
       취소
     </Button>
   </Modal.Footer>
     </Modal>
   </>  
   
 
 
 );
}

export default AwardCard;
