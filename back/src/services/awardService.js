import { User, Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
    static async addAward({ awardName, awardDesc }) {
        const award = await Award.findByName({ awardName });        // 수상 내역 중복 검사
        if ( award ) {
            const errorMessage = "이미 존재하는 수상내역입니다. 다른 수상내역을 입력해 주세요.";
            return { errorMessage };
        }

        const id = uuidv4();
        const newAward = { id, awardName, awardDesc };

        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    }

    static async getAwardInfo({ award_id }) {
        const award = await Award.findById({ award_id });
        return award;
    }

    static async getAwards({ userId }) {
        const awardsList = await Award.findByUserId({ userId });
        return awardsList;
    }
}

export { awardService }