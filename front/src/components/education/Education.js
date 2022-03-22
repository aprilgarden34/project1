import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ portfolioOwnerId, education, educations, setEducations, isEditable }) {
  //useState로 isEditing 상태를 생성함. 기본 값은 false로 설정
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          portfolioOwnerId={portfolioOwnerId}
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          educations={educations}
          setEducations={setEducations}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;
