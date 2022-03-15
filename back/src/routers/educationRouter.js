import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { userAuthService } from "../services/userService";
import { userAuthRouter } from "./userRouter";


const educationRouter = Router();

educationRouter.post("/education", async (req,res)=> {
  
    // const user_id = req.currentUserId;
    const user_id = "85be55c4-f540-439d-956d-273aa9db08ef";
    const user = await userAuthService.getUserInfo({
      user_id,
    })
  
    const school = req.body.school;
    const major = req.body.major;
    const education = req.body.education;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      user,
      school,
      major,
      education,
      
    });
    res.json(newEducation);
});


export { educationRouter };
