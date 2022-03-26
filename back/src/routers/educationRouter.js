import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { userAuthService } from "../services/userService";
import { userAuthRouter } from "./userRouter";
import { upload } from "../middlewares/upload";

const educationRouter = Router();

educationRouter.get("/education/:user_id", async (req, res, next) => {

  const user_id = req.params.user_id;
  const user = await userAuthService.getUserInfo({
    user_id,
  });
  const educations = await educationService.getEducations({ user });

  res.json(educations);

});

educationRouter.post("/education/create", login_required, async (req, res, next) => {

  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "값이 비어있습니다."
      );
    }
    const user_id = req.currentUserId;
    // const user_id = "85be55c4-f540-439d-956d-273aa9db08ef";
    const user = await userAuthService.getUserInfo({
      user_id,
    });

    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      user,
      school,
      major,
      position,
    });
    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});


educationRouter.put("/educations/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    const newEducation = await educationService.updateEducation({
      id,
      school,
      major,
      position,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/educations/:id", async (req, res, next) => {
    const id = req.params.id;
    const deleteEducaiton = await educationService.deleteEducation({
      id,
    });

    res.status(201).json(deleteEducaiton);

});

educationRouter.post(
  "/education/uploadFile",
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
  
      // req (request) 에서 데이터 가져오기
      // fileData: 프론트에서 요청받아 multer로 저장된 파일데이터
      const fileData = req.file;

      // multer 미들웨어에서 에러 발생시 error 출력
      if(fileData === undefined) {
        return res.status(202).json({
          error: false,
        }); 
      } else {

        res.status(200).json(fileData);
      }
    } catch (error) {
    next(error);
    }
  }
);

// 디스크에 저장된 filePath를 DB에 저장
educationRouter.patch(
  "/education/saveFile",
  login_required, 
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

      // req (request) 에서 데이터 가져오기
      const { id, filePath } = req.body;

      const newEducationFile = await educationService.addFileInfo({
        id,
        filePath,
      });

      if (newEducationFile.errorMessage) {
        throw new Error(newEducationFile.errorMessage);
      }

        res.status(200).json(newEducationFile);
        // res.status(200).json(fileData);
    } catch (error) {
    next(error);
    }
  }
);



export { educationRouter };
