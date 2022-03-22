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

// ----------------- delete 기능 추가 ----------------------------------------


  static async removeById({ certificate_id }) {
    const deletedCertificateList = await CertificateModel.remove({id: certificate_id})
    return deletedCertificateList
  } 

}

export { Certificate };
