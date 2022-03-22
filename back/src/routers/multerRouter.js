import is from "@sindresorhus/is";
import { Router } from "express";
import { append } from "express/lib/response";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const multer = require('multer')
const multerRouter = Router();


// Certificate Image // ----------------------------------------------------------------


/*multer engine, 업로드되는 파일 이름, 업로드되는 장소 선택 */
const certificateImageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images/certificate' )
  },
  filename: (req, res, cb) => {
    cb(null, 'Certificate' + '_' + req.body.currentUserId + '_' + req.body.certificateName + '_' + file.originalname )
  },
})

/*multer engine을 반영한 미들웨어 */ 
const uploadCertificate = multer({ storage: certificateImageStorageEngine })


/*multer Router, 중간에 미들웨어가 실행됨. */
multerRouter.post("/certificateImage", uploadCertificate.single('certificateImage'), 
  async function (req, res) {
  
  console.log(req.file)
  const message ="자격증 사진이 업로드 되었습니다."
  res.status(200).send(message)
})


// Project image // --------------------------------------------------------------------


/*multer engine, 업로드되는 파일 이름, 업로드되는 장소 선택 */
const projectImageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images/project' )
  },
  filename: (req, res, cb) => {
    cb(null, 'Project' + '_' + req.body.currentUserId + '_' + req.body.projectName + '_' + file.originalname)
  },
})

/* multer engine을 반영한 미들웨어 */ 
const uploadProject = multer({ storage: projectImageStorageEngine })


/*multer Router, 중간에 미들웨어가 실행됨. */
multerRouter.post("/projectImage", uploadProject.single('projectImage'), 
  async function (req, res) {
  
  console.log(req.file)
  const message = "프로젝트 사진이 업로드 되었습니다."
  res.status(200).send(message)
})

export { multerRouter };

