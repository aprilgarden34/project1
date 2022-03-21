import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ portfolioOwnerId, certificate, certificates, setCertificates, isEditable }) {
  //useState로 isEditing 상태를 생성함(편집창 나오는 상태)
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          portfolioOwnerId={portfolioOwnerId}
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          portfolioOwnerId={portfolioOwnerId}
          certificate={certificate}
          certificates={certificates}
          setCertificates={setCertificates}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;
