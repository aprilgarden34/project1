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

    static async update({ project_id, fieldToUpdate, newValue }) {
        const filter = { id: project_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
    
        const updatedProject = await ProjectModel.findOneAndUpdate(
          filter,
          update,
          option
        );
        return updatedProject;
    }

// ----------------- delete 기능 추가 ----------------------------------------


    static async removeById({ project_id }) {
        const deletedProjectList = await ProjectModel.remove({id: project_id})
        return deletedProjectList
  } 

// ----------------------------------------------------------------------------

}

export { Project };