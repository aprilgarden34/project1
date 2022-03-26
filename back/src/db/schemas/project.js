import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema (
    {
        id: {
            type: String,
            required: true,
        },
        projectName: {
            type: String,
            required: true,
        },
        projectDesc: {
            type: String,
            required: true,
        },
        projectStart: {
            type: String,
            required: true,
        },
        projectEnd: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // ----- 파일 업로드 : 저장경로 필드 생성
        filePath : {
            type: String,
        },
        // --------------------------------------
    },
    {
        timestamps: true,
    }
);

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };
