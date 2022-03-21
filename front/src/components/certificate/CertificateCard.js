import { Card, Button, Row, Col } from "react-bootstrap";
import React from "react";
import * as Api from "../../api";

function CertificateCard({ certificates, setCertificates, certificate, isEditable, setIsEditing }) {

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
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
