import { Card, Button, Row, Col } from "react-bootstrap";

// 편집 버튼 활성화는 isEditable이 true, setIsEditing(true)일 경우만 가능
function EducationCard({ education, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
        <span>{education?.school}</span>
          <br />
          <span className="text-muted">
            {education?.major}
            ({education?.position})
          </span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
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

export default EducationCard;
