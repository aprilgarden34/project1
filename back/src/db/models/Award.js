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
    
    static async removeById({ awardId }) {
        const deletedAwardtList = await AwardModel.remove({id: awardId})
        return deletedAwardtList;
    }

    // -------  파일 경로 값만 저장 -----------------

    static async addFileById({ awardId, filePath }) {
        const filter = { id: awardId };
        const update = { filePath: filePath };
        const option = { new: true };
        // const option = { returnOriginal: false };

        const addFileAward = await AwardModel.findOneAndUpdate(
        filter,
        update,
        option
        );

        return addFileAward;
    }

    // -------  파일 경로 값만 저장 -----------------

}

export { Award };
