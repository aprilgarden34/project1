import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload } from "../middlewares/upload";
import { userAuthService } from "../services/userService";

const uploadRouter = Router();

// 파일 업로드 생성(저장)
uploadRouter.post(
  "/certificate/uploadfile",
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
      if (!req.file) {
        throw new Error("정상적인 이미지 파일이 아닙니다. 다시 확인해주세요.");
      }

      res.status(200).json(req.file);

    } catch (error) {
      next(error);
    }
  }
);



export { uploadRouter };