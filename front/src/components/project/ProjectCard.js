/* 
  카드 컴퍼넌트는 메인화면에서 처음 나타나는 화면으로 유저가 입력한 프로젝트의 이름과 설명이 나타나는
  모드를 담당한다. 여기있는 편집 버튼에 연계된 함수가 Isediting 값을 변경하여 메인 화면 모드를 편집모드로
  변경되도록 Project 컴퍼넌트에서 작동한다. 
*/

import * as Api from "../../api";
import React, {useState} from "react";
import { Form, Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ projects, setProjects, project, isEditable, setIsEditing }) {
 
  // 이미지 미리보기를 위한 변수 설정
  const [image, setImage] = useState({ preview: '', data: '' })
  const [previewMode, setPreviewMode] = useState(false)

 //  ----------------------------------- 파일 업로드 ----------------------------------------

 const [projectFilePath, setProjectFilePath] = useState(null);

 // (프론트) filepath를 (백엔드) DB에 저장하는 handleSubmit 이벤트핸들러
 const handleSubmit = async (e) => {
   e.preventDefault();


  // 제출 버튼 누를시 미리보기 모드를 온 
  setPreviewMode(true)


   // portfolioOwnerId를 currentUserId 변수에 할당함.
   // const currentUserId = portfolioOwnerId;
   const currentProjectId = project.id;
   console.log('project id:', project.id);

   // 백엔드의 'project/saveFile' URI로 formPatch 요청 (참고. app.js 의 formPost)
   const res = await Api.patch("project/saveFile", {
     projectId: currentProjectId,
     filePath: projectFilePath
   });
   
   console.log('저장된 값은 과연 ', res.data);
   alert('백엔드에 이미지 파일이 저장되었습니다!')

 };

 // (프론트) 업로드 UI 내용물이 바뀔 때 (백엔드) uploads 폴더에 저장하는 handleChange 이벤트핸들러
 const handleChange = async (e) => {
   e.preventDefault();

   // 미리보기를 위한 설정
   
   const img = {
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0],
  }
    setImage(img)

   // files 데이터 전달할 formData 생성
   const formData = new FormData();

   // UI에서 받은 files 데이터를 formData에 file 필드로 저장
   const uploadFile = e.target.files[0];
   formData.append("file", uploadFile);

   // 백엔드의 'project/uploadfile' URI로 formPatch 요청 (참고. app.js 의 formPost)
   const res = await Api.filePost("project/uploadFile", formData);

   // 백엔드에서 에러 발생하는 경우, 예외처리
   if (res.data.error === false) {
     return alert('5mb 이하의 이미지 형식 파일인지 확인해주세요!');
   } else {
     // 백엔드에서 에러가 발생하지 않는 경우, filePath를 projectFilePath에 할당
     const fileInfo = {
       filePath: res.data.path,
       fileName: res.data.filename
     }
     console.log('백엔드에 저장된 데이터: ',fileInfo);

     setProjectFilePath(fileInfo.filePath);
   }   
 };

 // ------------------------------------------------------------------------------------------ 

  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
      {isEditable ?  
        <>
        <Col sm={4}>                                  
          <Form onSubmit= {handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
          {previewMode ? <Form>{image.preview && <img src={image.preview} alt="preview"width='120' height='150' />}</Form> 
            :<>  
              <Form className="mb-2">{image.preview && <img src={image.preview} alt="preview"width='90' height='120' />}</Form>    
              <Form.Control type="file" name="image" onChange={handleChange} />
              <Form.Control type="submit" />
            </>}
          </Form.Group>
          </Form>
        </Col>
        
        <Col sm={4}>
          <div style={{lineHeight: "8px"}}>
          <p>{project.projectName}</p>
          <p className="text-muted">{project.projectDesc}</p>
          <p className="text-muted">
            {`${project.projectStart} ~ ${project.projectEnd}`}
          </p>
          </div>
        </Col >

          <Col sm={1}>
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
    </>    
      : <Col sm={{ span: 20 }}>
          <div style={{lineHeight: '8px'}} > 
            <p>{project.projectName}</p>
            <p className="text-muted">{project.projectDesc}</p>
            <p className="text-muted" > {`${project.projectStart} ~ ${project.projectEnd}`} </p> 
           </div>
         </Col>   
    }
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;


