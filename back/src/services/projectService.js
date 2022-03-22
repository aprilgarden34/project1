import { User, Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async addProject({ userId, projectName, projectDesc, projectStart, projectEnd }) {
        const project = await Project.findByName({ projectName });        // 수상 내역 중복 검사
        if ( project ) {
            const errorMessage = "이미 존재하는 프로젝트입니다. 다른 프로젝트를 입력해 주세요.";
            return { errorMessage };
        }

        const id = uuidv4();
        const newProject = { id, projectName, projectDesc, projectStart, projectEnd, userId };

        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null;

        return createdNewProject;
        
    }

    static async getProjectInfo({ projectId }) {
        const project = await Project.findById({ projectId });
        return project;
    }

    static async setProject({ projectId, toUpdate }) {
        // 우선 해당 id 의 프로젝트가 db에 존재하는지 여부 확인
        let project = await Project.findById({ projectId });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage =
              "프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 업데이트 대상에 projectName이 있다면, 업데이트 진행
        if (toUpdate.projectName) {
            const fieldToUpdate = "projectName";
            const newValue = toUpdate.projectName;
            project = await Project.update({ projectId, fieldToUpdate, newValue})
        }

        if (toUpdate.projectDesc) {
            const fieldToUpdate = "projectDesc";
            const newValue = toUpdate.projectDesc;
            project = await Project.update({ projectId, fieldToUpdate, newValue})
        }

        if (toUpdate.projectStart) {
            const fieldToUpdate = "projectStart";
            const newValue = toUpdate.projectStart;
            project = await Project.update({ projectId, fieldToUpdate, newValue})
        }

        if (toUpdate.projectEnd) {
            const fieldToUpdate = "projectEnd";
            const newValue = toUpdate.projectEnd;
            project = await Project.update({ projectId, fieldToUpdate, newValue})
        }

        return project;
    }


    static async getProjects({ userId }) {
        const projectsList = await Project.findByUserId({ userId });
        return projectsList;
    }


//--------------------------------  Delete 서비스 추가  ----------------------------------------//


  static async delProject({ projectId }) {
      const deletedProjectList = await Project.removeById({ projectId })
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!deletedProjectList) {
        const errorMessage = "해당 프로젝트는 등록 내역이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage }
      }
    return deletedProjectList
    }

// -------------------------------  Delete 서비스 추가  -----------------------------------------//

}

export { projectService };