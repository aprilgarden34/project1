import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findAll() {
    const educations = await EducationModel.find({});
    return educations;
  }

  static async update({ user, school, major, education }) {
    const filter = { user };
    const update = { school, major, education }
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
