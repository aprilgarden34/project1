import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

class educationService {
    static async addEducation({ user, school, major, education }) {

        const newEducation = {user, school,major,education};
        const educations = await Education.create({newEducation});
        return educations;
    }
};

export { educationService };
