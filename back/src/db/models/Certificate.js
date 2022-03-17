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

}

export { Certificate };
