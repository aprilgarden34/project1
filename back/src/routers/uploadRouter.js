import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload } from "../middlewares/upload";
import { userAuthService } from "../services/userService";

const uploadRouter = Router();

// 파일 업로드로 file 데이터 생성
uploadRouter.post(
  "certificate/upload",
  login_required, 
  upload,
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

      // multer 미들웨어에서 에러 발생시 (파일 크기, 확장자 등)
      const fileData = req.file;
      if(fileData === undefined) {
        return res.status(202).json({
          error: false,
        }); 
      } else {
        res.status(200).json(req.file)
      }
  
    } catch (error) {
      next(error);
    }
  }
);



export { uploadRouter };