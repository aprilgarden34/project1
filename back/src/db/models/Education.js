import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id });
    return education;
  }

  static async findByUser({user}) {
    const educations = await EducationModel.find({user});
    return educations;
  }
  
  static async update({ id, school, major, position }) {
    const filter = { id };
    const update = { school, major, position };
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

