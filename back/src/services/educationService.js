import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class educationService {
    static async addEducation({ user, school, major, position }) {

        const id = uuidv4();
        const newEducation = {user, id, school,major, position};
        const education = await Education.create({newEducation});
        return education;
    }
    static async updateEducation({ id, school, major, position}){
        
        const newEducation = {id, school, major, position};
        const education = await Education.update(newEducation);
        return education;
    }
    static async getEducations({user}){
        const educations = await Education.findByUser({user});
        return educations;
    }
};



export { educationService };
