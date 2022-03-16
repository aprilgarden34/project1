import { Award } from "../db";

class awardService {
    static async addAward({ awardName, awardDesc }) {
        const award = await Award.findByName({ awardName });        // 수상 내역 중복 검사
        if ( award ) {
            const errorMessage = "이미 존재하는 수상내역입니다. 다른 수상내역을 입력해 주세요.";
            return { errorMessage }
        }
        const newAward = { awardName, awardDesc };

        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    }
}

export { awardService }