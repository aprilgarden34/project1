import { Schema, model } from "mongoose";

const AwardSchema = new Schema (
    {
        id: {
            type: String,
            required: true,
        },
        awardName: {        // 수상 내역
            type: String,
            required: true,
        },
        awardDesc: {        // 상세 내역
            type: String,
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
)

const AwardModel = model("Award", AwardSchema)

export { AwardModel };