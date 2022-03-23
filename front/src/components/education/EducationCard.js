import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

// 편집 버튼 활성화는 isEditable이 true, setIsEditing(true)일 경우만 가능
function EducationCard({ educations, setEducations, education, isEditable, setIsEditing }) {

  const DeleleteHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.delete("educations", education.id);
    } catch (err) {
      console.log("삭제 중 에러가 발생했습니다.", err);
    }
    setEducations((e) => {
      const delEdu = e.filter((v) => v.id !== education.id);
      return delEdu;
    });
  };
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
        <span className= "mb-4">{education?.school}</span>          
        <span className="text-muted" style={{display: 'block'}}>
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

export default EducationCard;
