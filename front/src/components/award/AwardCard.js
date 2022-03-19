import { Card, Button, Row, Col } from "react-bootstrap";

//등록된 Award 전체를 보여줌
// 편집 클릭시 isEditing = true
function AwardCard({ award, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.awardName}</span>
          <br />
          <span className="text-muted">{award.awardDesc}</span>
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

export default AwardCard;
