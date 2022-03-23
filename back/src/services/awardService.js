import { User, Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
    static async addAward({ userId, awardName, awardDesc }) {
        // 수상 내역 중복 검사
        const award = await Award.findByUserIdAndName({ userId, awardName });        
        if ( award ) {
            const errorMessage = "이미 존재하는 수상내역입니다. 다른 수상내역을 입력해 주세요.";
            return { errorMessage };
        }

        const id = uuidv4();
        const newAward = { id, awardName, awardDesc, userId };

        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    }

    static async getAwardInfo({ awardId }) {
        const award = await Award.findById({ awardId });
        return award;
    }

    static async setAward({ awardId, toUpdate }) {
        // 우선 해당 id 의 수상내역이 db에 존재하는지 여부 확인
        let award = await Award.findById({ awardId });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
            const errorMessage =
              "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 업데이트 대상에 awardName이 있다면, 업데이트 진행
        if (toUpdate.awardName) {
            const fieldToUpdate = "awardName";
            const newValue = toUpdate.awardName;
            award = await Award.update({ awardId, fieldToUpdate, newValue})
        }

        if (toUpdate.awardDesc) {
            const fieldToUpdate = "awardDesc";
            const newValue = toUpdate.awardDesc;
            award = await Award.update({ awardId, fieldToUpdate, newValue})
        }

        return award;
    }

    static async getAwards({ userId }) {
        const awardsList = await Award.findByUserId({ userId });
        return awardsList;
    }

    static async delAward({ awardId }) {
        const deletedAwardList = await Award.removeById({ awardId })
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!deletedAwardList) {
          const errorMessage = "해당 프로젝트는 등록 내역이 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage }
        }
      return deletedAwardList;
      }
}

export { awardService }