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
    
        const { projectName, projectDesc, projectStart, projectEnd } = req.body;
        const userId = currentUserInfo._id;
    
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

projectRouter.get(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            const project_id = req.params.id;
            const currentProjectInfo = await projectService.getProjectInfo({ project_id });

            if (currentProjectInfo.errorMessage) {
                throw new Error(currentProjectInfo.errorMessage)
            }

            res.status(200).send(currentProjectInfo);
        } catch (error) {
            next(error);
        }
    }
);

projectRouter.put(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const project_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const projectName = req.body.projectName ?? null;
            const projectDesc = req.body.projectDesc ?? null;
            const projectStart = req.body.projectStart ?? null;
            const projectEnd = req.body.projectEnd ?? null;

            const toUpdate = { projectName, projectDesc, projectStart, projectEnd };

            const updatedProject = await projectService.setProject({ project_id, toUpdate });

            if (updatedProject.errorMessage) {
                throw new Error(updatedProject.errorMessage);
            }

            res.status(200).json(updatedProject);
        } catch (error) {
            next(error);
        }
    }
)

projectRouter.get(
    "/projectList/:user_id",
    login_required, 
    async function(req, res, next) {
        try {
            const user_id = req.params.user_id;
            const currentUserInfo = await userAuthService.getUserInfo({ user_id });

            if (currentUserInfo.errorMessage) {
                throw new Error(currentUserInfo.errorMessage);
            }
        
            const userId = currentUserInfo._id;
            const currentProjects = await projectService.getProjects({ userId });
        
            res.status(200).send(currentProjects);
        } catch (error) {
            next(error);
        }
    }
);


//----------------------------------delete 기능 라우터 추가  ----------------------------------//

projectRouter.delete(
  "/projectList/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 프로젝트 id를 추출함.
      const project_id = req.params.id;
      
      // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 삭제함.
      const deletedProject = await projectService.delProject({ project_id });

      if (deletedProject.errorMessage) {
        throw new Error(deletedProject.errorMessage);
      }

      res.status(200).json(deletedProject);
    } catch (error) {
      next(error);
    }
  }
);

//--------------------------------------------------------------------------------------------//


export { projectRouter };