import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    id: {
      type : String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    filePath : {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
