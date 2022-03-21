import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class educationService {
    static async addEducation({ user, school, major, position }) {

        const id = uuidv4();
        const newEducation = { user, id, school, major, position };
        const education = await Education.create({ newEducation });
        return {
            ...this.parseEducation({education}),
            user_id:user.id
        }
    }
    static async updateEducation({ id, school, major, position }) {

        const newEducation = { id, school, major, position };
        const education = await Education.update(newEducation);
        return this.parseEducation({education});
    }
    static async getEducations({ user }) {
        let educations = await Education.findByUser({ user });
        educations = educations.map(education=>{
            return this.parseEducation({education})
        })
        return educations;
    }

    static parseEducation({ education }) {
        return {
            school: education.school,
            major: education.major,
            position: education.position
        }
    }
};



export { educationService };
