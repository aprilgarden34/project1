import { User, Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({ certificateName, certificateDesc, certificateDate, userId  }) {
    // 자격증 중복 확인
    const certificate = await Certificate.findByUserIdAndName({ userId, certificateName });
    if (certificate) {
      const errorMessage =
        "이미 등록된 자격증입니다. 다른 자격증을 입력해 주세요.";
      return { errorMessage };
    }
    // id 는 유니크 값 부여
    const id = uuidv4();

    const newCertificate = { id, certificateName, certificateDesc, certificateDate, userId };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  static async getCertificateInfo({ certificateId }) {
    const certificate = await Certificate.findById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "해당 자격증은 등록 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage }
    }
    return certificate;
  }

  static async setCertificateInfo({ certificateId, toUpdate }) {
    // 우선 해당 id 의 자격증이 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "해당 자격증은 등록 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 certificateName이 있다면, 업데이트 진행
    if (toUpdate.certificateName) {
      const fieldToUpdate = "certificateName";
      const newValue = toUpdate.certificateName;
      certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
    }

    if (toUpdate.certificateDesc) {
      const fieldToUpdate = "certificateDesc";
      const newValue = toUpdate.certificateDesc;
      certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
    }

    if (toUpdate.certificateDate) {
      const fieldToUpdate = "certificateDate";
      const newValue = toUpdate.certificateDate;
      certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async getCertificates({ userId }) {
    const certificatesList = await Certificate.findByUserId({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificatesList) {
      const errorMessage =
        "해당 사용자는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificatesList;
  }

}

export { certificateService };
