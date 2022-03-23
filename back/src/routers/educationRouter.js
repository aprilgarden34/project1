import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { userAuthService } from "../services/userService";
import { userAuthRouter } from "./userRouter";


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


export { educationRouter };
