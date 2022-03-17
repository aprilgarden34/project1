import { User, Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({ certificateName, certificateDesc, certificateDate, userId  }) {
    // 자격증 중복 확인
    const certificate = await Certificate.findByName({ certificateName });
    if (certificate) {
      const errorMessage =
        "이 자격증 이름은 이미 등록되었습니다. 다른 자격증을 입력해 주세요.";
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

  static async getCertificates({ userId }) {
    const certificates = await Certificate.findById({ userId });
    return certificates;
  }

}

export { certificateService };
