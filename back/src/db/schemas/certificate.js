import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    certificateName: {
      type: String,
      required: true,
    },
    certificateDesc: {
      type: String,
      required: true,
    },
    certificateDate: {
      type: String,
      required: true,
    },
    // ----- 파일 업로드 : 저장경로 필드 생성
    filePath : {
      type: String,
    },
    // --------------------------------------
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
