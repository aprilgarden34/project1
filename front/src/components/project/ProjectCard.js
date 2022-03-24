/* 
  카드 컴퍼넌트는 메인화면에서 처음 나타나는 화면으로 유저가 입력한 프로젝트의 이름과 설명이 나타나는
  모드를 담당한다. 여기있는 편집 버튼에 연계된 함수가 Isediting 값을 변경하여 메인 화면 모드를 편집모드로
  변경되도록 Project 컴퍼넌트에서 작동한다. 
*/

import * as Api from "../../api";
import React, {useState} from "react";
import { Form, Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ projects, setProjects, project, isEditable, setIsEditing }) {
  
const [projectImage, setProjectsImage] = useState(null)
  
  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
        {/*--------------------------- multer 관련 부분 ---------------------------------*/ }
        <Col xs lg="1">                                  
          <Form onSubmit= {(e) => { 
            e.preventDefault()
            const formData = new FormData()
            formData.append('file', projectImage)  
            Api.formPost("project/image", formData 
           )}}>

          <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>사진 추가</Form.Label>
          <Form.Control type="file" onChange={(e)=> setProjectsImage(e.target.files[0])} />
          <Form.Control type="submit"/>
          </Form.Group>
          </Form>
        </Col>
          {/*--------------------------- multer 관련 부분 ---------------------------------*/ }
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
            <div className="d-grid gap-2">
              <Button
                variant="outline-primary" 
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
              <Button
              variant="outline-danger"
              size="sm"
              className="mr-3"
              onClick={() => {
                   const index = projects.indexOf(project)              
                   projects.splice(index, 1)
                   const newProjects = [...projects]
                   setProjects(newProjects)        
                   Api.delete("projectList", project.id )      
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

export default ProjectCard;


