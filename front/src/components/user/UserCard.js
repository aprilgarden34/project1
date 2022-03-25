import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: '', data: '' })
  const [userFilePath, setUserFilePath] = useState(null);
  

  // (프론트) filepath를 (백엔드) DB에 저장하는 handleSubmit 이벤트핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = user.id;
    console.log('user id:', user.id);

    const res = await Api.patch("certificate/saveFile", {
      userId: currentUserId,
      filePath: userFilePath
    });
    
    console.log('저장된 값은 ', res.data);
    alert('백엔드에 이미지 파일이 저장되었습니다!')
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

    const res = await Api.filePost("user/uploadFile", formData);

    if (res.data.error === false) {
      return alert('5mb 이하의 이미지 형식 파일인지 확인해주세요!');
    } else {
        const fileInfo = {
        filePath: res.data.path,
        fileName: res.data.filename
      }
      console.log('백엔드에 저장된 데이터: ',fileInfo);

      setUserFilePath(fileInfo.filePath);
    }   
  };    
    
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Form 
            encType="multipart/form-data"
            style={{ display: 'flex' }} 
            onSubmit={handleSubmit}
            >  
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>프로필 사진을 업로드해주세요.</Form.Label>
              <Form>{image.preview && <img src={image.preview} alt="preview" width='100' height='100' />}</Form>                      
              <Form.Control type="file" onChange={handleChange} /> 
              <Form.Control type="submit" />           
            </Form.Group>
          </Form>
          
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;