import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
