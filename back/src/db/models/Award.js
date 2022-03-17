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

    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }
    
    static async findByUserId({ userId }) {
        const awardList = await AwardModel.find({ userId });
        return awardList;
    }
    
}

export { Award };