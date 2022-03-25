import { Form ,Card, Button, Row, Col } from "react-bootstrap";
import React, {useState} from "react";
import * as Api from "../../api";

function CertificateCard({ certificates, setCertificates, certificate, isEditable, setIsEditing }) {

  // 이미지 미리보기를 위한 변수 설정
  const [image, setImage] = useState({ preview: '', data: '' })
  const [previewMode, setPreviewMode] = useState(false)

 //  ----------------------------------- 파일 업로드 ----------------------------------------

 const [certificateFilePath, setCertificateFilePath] = useState(null);

 // (프론트) filepath를 (백엔드) DB에 저장하는 handleSubmit 이벤트핸들러
 const handleSubmit = async (e) => {
   e.preventDefault();

   setPreviewMode(true) // 제출 버튼 누를시 미리보기만 뜨게함.
   console.log("프리뷰 모드가 작동합니다.")
   
   // portfolioOwnerId를 currentUserId 변수에 할당함.
   // const currentUserId = portfolioOwnerId;
   const currentCertificateId = certificate.id;
   console.log('certificate id:', certificate.id);

   // 백엔드의 'certificate/saveFile' URI로 formPatch 요청 (참고. app.js 의 formPost)
   const res = await Api.patch("certificate/saveFile", {
     certificateId: currentCertificateId,
     filePath: certificateFilePath
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

   // 백엔드의 'certificate/uploadfile' URI로 formPatch 요청 (참고. app.js 의 formPost)
   const res = await Api.filePost("certificate/uploadFile", formData);

   // 백엔드에서 에러 발생하는 경우, 예외처리
   if (res.data.error === false) {
     return alert('5mb 이하의 이미지 형식 파일인지 확인해주세요!');
   } else {
     // 백엔드에서 에러가 발생하지 않는 경우, filePath를 CertificateFilePath에 할당
     const fileInfo = {
       filePath: res.data.path,
       fileName: res.data.filename
     }
     console.log('백엔드에 저장된 데이터: ',fileInfo);

     setCertificateFilePath(fileInfo.filePath);
   }   
 };

 // ------------------------------------------------------------------------------------------ 


  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
       {/* ------------------------------- Murter 관련 부분 ------------------------------ */}
        <Col sm={4}>              
         <Form onSubmit={handleSubmit} encType="multipart/form-data" >         
           <Form.Group controlId="formFile" className="mb-3">
            {previewMode ? <Form>{image.preview && <img src={image.preview} alt="preview"width='120' height='160' />}</Form> 
            :<>
              <Form>{image.preview && <img src={image.preview} alt="preview"width='100' height='100' />}</Form>    
              <Form.Control type="file" name="image" onChange={handleChange} />
              <Form.Control type="submit" />
            </>}
            </Form.Group>
         </Form>
        </Col>
      {/* ------------------------------- Murter 관련 부분 -------------------------------- */}
        <Col sm={4}>    
          <div style={{lineHeight: '5px'}} > 
            <p>{certificate.certificateName}</p>
            <p className="text-muted">{certificate.certificateDesc}</p>
            <p className="text-muted">{certificate.certificateDate}</p>    
          </div>
        </Col>
        {isEditable && (
            <Col sm={1}>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)} //editing 모드를 편집상태로 전환!
                  className="mr-3"
                >편집
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mr-3"
                  onClick={() => {
                                 const index = certificates.indexOf(certificate)              
                                 certificates.splice(index, 1)
                                 const newCertificates = [...certificates]
                                 setCertificates(newCertificates)        
                                 Api.delete("certificates", certificate.id )      
                                }
                            }
                  >삭제
                </Button>
              </div>
            </Col>
        )}
      </ Row>
    </Card.Text>
  );
}

export default CertificateCard;


