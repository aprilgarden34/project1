import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findByUserIdAndName({ userId, awardName }) {
        const award = await AwardModel.findOne({ $and: [{userId}, {awardName}] });
        return award;
    }

    static async findById({ awardId }) {
        const award = await AwardModel.findOne({ id: awardId });
        return award;
    }
    
    static async findByUserId({ userId }) {
        const awardList = await AwardModel.find({ userId });
        return awardList;
    }
    
    static async update({ awardId, fieldToUpdate, newValue }) {
        const filter = { id: awardId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
    
        const updatedAward = await AwardModel.findOneAndUpdate(
          filter,
          update,
          option
        );
        return updatedAward;
    }
}

export { Award };
