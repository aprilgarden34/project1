import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";


/* 
Projects 컴퍼넌트는 뼈대가 되는 컴퍼넌트로 처음 로그인 하고 들어올시 보이는 
프로젝트 관련 네모칸 화면 첫페이지를 담당한다.

Projects 컴퍼넌트는 AddForm에서 추가한 각각의 자격증의 관한 정보를 서버에서 Get해와서
그 정보를 바탕으로 Map함수를 활용하여 화면에 순서대로 보여준다. 

먼저 로그인시 받아온 portfolioOwnerId를 useEffect에 활용하여 portfolioOwnerId가 전에 
추가했던 프로젝트 관련 자료를 API에서 받아오고 자격증 정보를 바탕으로 map함수를 활용하여 같은 폴더내의 Certificate 컴퍼넌트를 불러오고 그걸 차례차례 쌓아 화면을 구성한다.  

쌓아 구성된 Certificate 컴퍼넌트는 isEditing 기본상태가 false므로 처음에는 Card 컴퍼넌트가 나타난다. 
Card 컴퍼넌트에서 편집버튼을 누를경우 isEditing 기본상태가 True가 되어 편집 버튼을 선택한 카드 컴퍼넌트가 있는 위치에만 편집컴퍼넌트를 띄어준다.

마지막으로 (+) 버튼이 맨 밑에 추가되었는데 isAdding 변수로 조정된다. isAdding은 기본값은 false고
(+) 버튼을 누를떄 True로 바뀌어서 Add 컴퍼넌트를 밑칸에 열어준다. 열린 Add 컴퍼넌트에서 확인 버튼을 누를 경우 입력값이 서버로 전송되고 isAdding 변수가 True로 바뀌어 Add 컴퍼넌트를 닫아준다. 취소 버튼을 누를 경우 isAdding 변수만 바꿔준다.   

*/   



function Projects({ portfolioOwnerId, isEditable }) {
  
  const [projects, setProjects] = useState([]);
  
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projectlist", portfolioOwnerId).then((res) =>
      setProjects(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;