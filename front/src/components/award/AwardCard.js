import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
//등록된 Award 전체를 보여줌
// 편집 클릭시 isEditing = true
function AwardCard({ awards, setAwards, award, isEditable, setIsEditing }) {

  const DeleleteHandler = async (e) => {
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

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col className="text-center mb-4">
          <span className= "mb-4">{award.awardName}</span>
          <span className="text-muted" style={{display: 'block'}}>{award.awardDesc}</span>
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
            <Button
              variant="outline-info"
              size="sm"
              onClick={DeleleteHandler}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
