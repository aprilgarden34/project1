/* 
  카드 컴퍼넌트는 메인화면에서 처음 나타나는 화면으로 유저가 입력한 프로젝트의 이름과 설명이 나타나는
  모드를 담당한다. 여기있는 편집 버튼에 연계된 함수가 Isediting 값을 변경하여 메인 화면 모드를 편집모드로
  변경되도록 Project 컴퍼넌트에서 작동한다. 
*/

import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          {project.projectName}
          <br />
          <span className="text-muted">{project.projectDesc}</span>
          <br />
          <span className="text-muted">
            {`${project.projectStart} ~ ${project.projectEnd}`}
          </span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
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

export default ProjectCard;