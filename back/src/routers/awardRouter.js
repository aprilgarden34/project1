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

        const newAward = await awardService.addAward({
            awardName,
            awardDesc,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward, errorMessage)
        }

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});


export { awardRouter };