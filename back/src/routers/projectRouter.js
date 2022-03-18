import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from "../services/userService";
import { projectService } from '../services/projectService';

const projectRouter = Router();

projectRouter.post('/project/create', login_required, async function (req, res, next) {
    try {
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage)
        }
    
        const userId = currentUserInfo._id;
        const projectName = req.body.projectName;
        const projectDesc = req.body.projectDesc;
        const projectStart = req.body.projectStart;
        const projectEnd = req.body.projectEnd;
    
        const newProject = await projectService.addProject({
            userId,
            projectName,
            projectDesc,
            projectStart,
            projectEnd,
        });
  
        if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }
  
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };