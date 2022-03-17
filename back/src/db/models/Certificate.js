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

  static async findById({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }

}

export { Certificate };
