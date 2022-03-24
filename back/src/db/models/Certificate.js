import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByUserIdAndName({ userId, certificateName }) {
    const certificate = await CertificateModel.findOne({$and: [{userId}, {certificateName}] });
    return certificate;
  }

  static async findById({ certificateId }) {
    const certificate = await CertificateModel.findOne({ id: certificateId });
    return certificate;
  }

  static async findByUserId({ userId }) {
    const certificatesList = await CertificateModel.find({ userId });
    return certificatesList;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedCertificate;
  }

  static async delete({ certificateId }) {
    const deletedCertificateList = await CertificateModel.deleteOne({ id: certificateId });
    return deletedCertificateList;
  }

  // -------  파일 경로 값만 저장 -----------------

  static async addFileById({ certificateId, filePath }) {
    const filter = { id: certificateId };
    const update = { filePath: filePath };
    const option = { new: true };
    // const option = { returnOriginal: false };

    const addFileCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return addFileCertificate;
  }

  // -------  파일 경로 값만 저장 -----------------
}

export { Certificate };
