import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 나의 자격증 생성
certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const certificateName = req.body.certificateName;
    const certificateDesc = req.body.certificateDesc;
    const certificateDate = req.body.certificateDate;

    // 위 데이터를 자격증 db에 추가하기
    const newCertificate = await certificateService.addCertificate({ 
        certificateName,
        certificateDesc,
        certificateDate,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };