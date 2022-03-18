import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ newProject }) {
        const createdNewproject = await ProjectModel.create(newProject);
        return createdNewproject;
    }

    static async findByName({ projectName }) {
        const project = await ProjectModel.findOne({ projectName });
        return project;
    }

    static async findById({ project_id }) {
        const project = await ProjectModel.findOne({ id: project_id });
        return project;
    }

    static async findByUserId({ userId }) {
        const projectList = await ProjectModel.find({ userId });
        return projectList;
    }
}

export { Project };