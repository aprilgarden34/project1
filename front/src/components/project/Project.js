import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

/*
  Projects 컴퍼넌트를 구성하는 하위 컴퍼넌트로 메인화면을 띄어주는 모드(하위 Card컴퍼넌트 담당) ,
  편집화면을 띄어주는 모드(하위 Edit컴퍼넌트 담당)로 나늰다.
  나늬어 화면을 보여주는 컴퍼넌트이다.
*/

function Project({portfolioOwnerId, project, projects, setProjects, isEditable }) {
  /*isEditing 값을 변경하여 편집모드와 메인화면 모드를 변경한다. 
    기본값은 false로 메인화면이 보여진다./ */ 
     
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          portfolioOwnerId={portfolioOwnerId}
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          projects={projects}
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
