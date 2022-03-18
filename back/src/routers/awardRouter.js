import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { awardService } from "../services/awardService";

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

        const awardName = req.body.awardName;
        const awardDesc = req.body.awardDesc;
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
    async function  (req, res, next) {
        try {
            const award_id = req.params.id;
            const currentAwardInfo = await awardService.getAwardInfo({ award_id });

            if (currentAwardInfo) {
                throw new Error(currentAwardInfo.errorMessage)
            }

            res.status(200).send(currentAwardInfo);
        } catch (error) {
            next(error);
        }
    }
);

awardRouter.put(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const award_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const awardName = req.body.awardName ?? null;
            const awardDesc = req.body.awardDesc ?? null;

            const toUpdate = { awardName, awardDesc };

            const updatedAward = await awardService.setAward({ award_id, toUpdate });

            if (updatedAward.errorMessage) {
                throw new Error(updatedAward.errorMessage);
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
)


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
export { awardRouter };