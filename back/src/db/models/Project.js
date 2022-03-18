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
}

export { Project };