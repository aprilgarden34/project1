import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [ userImage, setUserImage ] = useState(null)

  //파일업로드시 작동
  const SubmitHandler = async (e) => {       
    e.preventDefault();
       
    const formData = new FormData();
    formData.append("file", userImage);
    // const res = await Api.formPost("user/image", formData);

    // if (res.data) {
    //   const fileInfo = {
    //     filePath: res.data.path,
    //     fileName: res.data.filename
    //   }
    //   console.log('백엔드에 저장된 데이터: ',fileInfo);      
    //   alert('백엔드에 이미지 파일이 저장되었습니다!')
    // } 
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Form 
            encType="multipart/form-data" 
            style={{ width: "10rem",  height: "8rem" }}
            onSubmit={SubmitHandler}
            >  
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>프로필 사진을 업로드해주세요.</Form.Label>            
              <Form.Control type="file" onChange={(e) => setUserImage(e.target.files[0])} /> 
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
