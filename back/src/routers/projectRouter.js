import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { upload } from "../middlewares/upload";
import { userAuthService } from "../services/userService";
import { projectService } from '../services/projectService';

import multer from "multer";

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
            const projectId = req.params.id;
            const currentProjectInfo = await projectService.getProjectInfo({ projectId });

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
            // URI로부터 프로젝트 id를 추출함.
            const projectId = req.params.id;
            // body data 로부터 업데이트할 프로젝트 정보를 추출함.
            const projectName = req.body.projectName ?? null;
            const projectDesc = req.body.projectDesc ?? null;
            const projectStart = req.body.projectStart ?? null;
            const projectEnd = req.body.projectEnd ?? null;

            const toUpdate = { projectName, projectDesc, projectStart, projectEnd };

            const updatedProject = await projectService.setProject({ projectId, toUpdate });

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
      const projectId = req.params.id;
      
      // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 삭제함.
      const deletedProject = await projectService.delProject({ projectId });

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



// multer로 file 데이터 디스크에 저장
projectRouter.post(
    "/project/uploadFile",
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
projectRouter.patch(
    "/project/saveFile",
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
        const { projectId, filePath } = req.body;
  
        const newProjectFile = await projectService.addFileInfo({
            projectId,
            filePath,
        });
  
        if (newProjectFile.errorMessage) {
          throw new Error(newProjectFile.errorMessage);
        }
  
          res.status(200).json(newProjectFile);
          // res.status(200).json(fileData);
      } catch (error) {
      next(error);
      }
    }
);

export { projectRouter };