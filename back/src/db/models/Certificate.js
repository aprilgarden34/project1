import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByName({ certificateName }) {
    const certificate = await CertificateModel.findOne({ certificateName });
    return certificate;
  }

  static async findById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ id: certificate_id });
    return certificate;
  }

  static async findByUserId({ userId }) {
    const certificatesList = await CertificateModel.find({ userId });
    return certificatesList;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { id: certificate_id };
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
