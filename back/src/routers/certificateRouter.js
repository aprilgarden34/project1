// import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 나의 자격증 생성
certificateRouter.post("/certificate/create", login_required, async function (req, res, next) {
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
    const certificateName = req.body.certificateName;
    const certificateDesc = req.body.certificateDesc;
    const certificateDate = req.body.certificateDate;
    const userId = currentUserInfo._id;

    // 위 데이터를 자격증 db에 추가하기
    const newCertificate = await certificateService.addCertificate({ 
        certificateName,
        certificateDesc,
        certificateDate,
        userId,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 유저 자격증 한 개 조회
/*userAuthRouter.get(
  "/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      const certificate_id = req.params.id;
      const currentCertificate = await certificateService.getCertificates({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);*/


export { certificateRouter };