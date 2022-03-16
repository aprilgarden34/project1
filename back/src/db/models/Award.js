import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findByName({ awardName }) {
        const award = await AwardModel.findOne({ awardName });
        return award;
    }
}

export { Award };