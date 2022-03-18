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
      type: Date,
      required: true,
    },
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
