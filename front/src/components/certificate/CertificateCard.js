import { Card, Button, Row, Col } from "react-bootstrap";
import React from "react";
import * as Api from "../../api";

function CertificateCard({ certificates, setCertificates, certificate, isEditable, setIsEditing }) {

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col xs lg="1">              
            <form action = "/certificateImage" method="POST"
              enctype = "multipart/form-data"                
              onSubmit = {() => Api.post("certificateImage", 
              {
                currentUserId: certificate.currentUserId,
                certificateName: certificate.certificateName,
              })}>
              <input type="file" name="certificateImage" defaultValue="경로" />
              <button type="submit">제출</button> 
            </ form>         
        </Col>
        <Col>    
          <div className="text-center"> 
            {certificate.certificateName}
            <br />
            <span className="text-muted">{certificate.certificateDesc}</span>
            <br />
            <span className="text-muted">{certificate.certificateDate}</span>    
          </div>
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
                                 Api.delete("certificateList", certificate.id )      
                                }
                            }
                  >삭제
                </Button>
              </div>
            </Col>
        )}
      </ Row>
    </Card.Text>
  );
}

export default CertificateCard;


// async function post(endpoint, data) {
//   // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
//   // 예시: {name: "Kim"} => {"name": "Kim"}
//   const bodyData = JSON.stringify(data);
//   console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
//   console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

//   return axios.post(serverUrl + endpoint, bodyData, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//     },
//   });
// }