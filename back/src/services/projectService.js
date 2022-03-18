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

    static async getProjectInfo({ project_id }) {
        const project = await Project.findById({ project_id });
        return project;
    }

    static async getProjects({ userId }) {
        const projectsList = await Project.findByUserId({ userId });
        return projectsList;
    }
}

export { projectService };