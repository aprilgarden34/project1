import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ newProject }) {
        const createdNewproject = await ProjectModel.create(newProject);
        return createdNewproject;
    }

    static async findByUserIdAndName({ userId, projectName }) {
        const project = await ProjectModel.findOne({ $and: [{userId}, {projectName}] });
        return project;
    }

    static async findById({ projectId }) {
        const project = await ProjectModel.findOne({ id: projectId });
        return project;
    }

    static async findByUserId({ userId }) {
        const projectList = await ProjectModel.find({ userId });
        return projectList;
    }

    static async update({ projectId, fieldToUpdate, newValue }) {
        const filter = { id: projectId };
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


    static async removeById({ projectId }) {
        const deletedProjectList = await ProjectModel.remove({id: projectId})
        return deletedProjectList
  } 

// ----------------------------------------------------------------------------
// -------  파일 경로 값만 저장 -----------------

static async addFileById({ projectId, filePath }) {
    const filter = { id: projectId };
    const update = { filePath: filePath };
    const option = { new: true };
    // const option = { returnOriginal: false };

    const addFileProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
    );

    return addFileProject;
}

// -------  파일 경로 값만 저장 -----------------

}

export { Project };