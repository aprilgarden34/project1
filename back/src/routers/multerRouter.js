import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

import multer from "multer";
const multerRouter = Router();


// Certificate Image // ----------------------------------------------------------------


/*multer engine, 업로드되는 파일 이름, 업로드되는 장소 선택 */
const awardImageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/award' )
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname )
  },
})

/*multer engine을 반영한 미들웨어 */ 
const uploadAward = multer({ storage: awardImageStorageEngine })


/*multer Router, 중간에 미들웨어가 실행됨. */
multerRouter.post("/award/image", login_required, uploadAward.single('file'), 
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



// Project image // --------------------------------------------------------------------


/*multer engine, 업로드되는 파일 이름, 업로드되는 장소 선택 */
const projectImageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/project' )
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname )
  },
})

/* multer engine을 반영한 미들웨어 */ 
const uploadProject = multer({ storage: projectImageStorageEngine })


/*multer Router, 중간에 미들웨어가 실행됨. */
multerRouter.post("/project/image", login_required, uploadProject.single('file'), 
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


export { multerRouter };