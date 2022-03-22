import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

import path from "path";
import multer from "multer";

const uploadRouter = Router();

// 파일 저장 디렉토리 설정
const upload = multer({
  storage: multer.diskStorage({
    // 파일 저장 경로 : uploads/
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    // 파일 이름 형식 : 오늘날짜_원래이름
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    // 파일 허용 조건 : 확장자 .mp4 만
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".png" ) {
          return cb(res.status(400).end("only jpg, png is allowed"), false);
        }
        cb(null, true);
    },
    // 파일 크기제한 : 5mb (1024 * 1024)
    limits: { 
        fileSize: 5 * 1024 * 1024 
    }, 
  }),
});

// 나의 자격증 생성
uploadRouter.post(
  "/upload",
  login_required, upload.single('file'),
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json(req.file);

    } catch (error) {
      next(error);
    }
  }
);

/*
router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});


*/


export { uploadRouter };