import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload } from "../middlewares/upload";
import { userAuthService } from "../services/userService";
import { awardService } from "../services/awardService";

import multer from "multer";

const awardRouter = Router();

awardRouter.post("/award/create", login_required, async function(req, res, next) {
    try {
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage)
        }

        const { awardName, awardDesc } = req.body;
        const userId = currentUserInfo._id;

        const newAward = await awardService.addAward({
            userId,
            awardName,
            awardDesc,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage)
        }

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});

// 수상 내역 조회
awardRouter.get(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
        try {
            const awardId = req.params.id;
            const currentAwardInfo = await awardService.getAwardInfo({ awardId });

            if (currentAwardInfo.errorMessage) {
                throw new Error(currentAwardInfo.errorMessage)
            }

            res.status(200).send(currentAwardInfo);
        } catch (error) {
            next(error);
        }
    }
);

// 수상 내역 수정
awardRouter.put(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 수상내역 id를 추출함.
            const awardId = req.params.id;
            // body data 로부터 업데이트할 수상내역 정보를 추출함.
            const awardName = req.body.awardName ?? null;
            const awardDesc = req.body.awardDesc ?? null;

            const toUpdate = { awardName, awardDesc };

            const updatedAward = await awardService.setAward({ awardId, toUpdate });

            if (updatedAward.errorMessage) {
                throw new Error(updatedAward.errorMessage);
            }

            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

// 수상 내역 리스트 조회
awardRouter.get(
    "/awardlist/:user_id", 
    login_required, 
    async function(req, res, next) {
        try {
            const user_id = req.params.user_id;
            const currentUserInfo = await userAuthService.getUserInfo({ user_id });

            if (currentUserInfo.errorMessage) {
                throw new Error(currentUserInfo.errorMessage);
            }
        
            const userId = currentUserInfo._id;
            const currentAwards = await awardService.getAwards({ userId });
        
            res.status(200).send(currentAwards);
        } catch (error) {
            next(error);
        }
    }
);

// 수상 내역 삭제
awardRouter.delete(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
      try {
        // URI로부터 수상내역 id를 추출함.
        const awardId = req.params.id;
        
        // 해당 수상내역 아이디로 수상내역 정보를 db에서 찾아 삭제함.
        const deletedAward = await awardService.delAward({ awardId });
  
        if (deletedAward.errorMessage) {
          throw new Error(deletedAward.errorMessage);
        }
  
        res.status(200).json(deletedAward);
      } catch (error) {
        next(error);
      }
    }
);




// multer로 file 데이터 디스크에 저장
awardRouter.post(
    "/award/uploadFile",
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
awardRouter.patch(
    "/award/saveFile",
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
        const { awardId, filePath } = req.body;
  
        const newAwardFile = await awardService.addFileInfo({
          awardId,
          filePath,
        });
  
        if (newAwardFile.errorMessage) {
          throw new Error(newAwardFile.errorMessage);
        }
  
          res.status(200).json(newAwardFile);
          // res.status(200).json(fileData);
      } catch (error) {
      next(error);
      }
    }
);


export { awardRouter };