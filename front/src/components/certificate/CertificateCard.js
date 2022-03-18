import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.certificateName}
          <br />
          <span className="text-muted">{certificate.certificateDesc}</span>
          <br />
          <span className="text-muted">{certificate.certificateDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)} //editing 모드를 편집상태로 전환!
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
