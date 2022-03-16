import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.post("/award/create", async function(req, res, next) {
    try {
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