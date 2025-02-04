import mongoose from "mongoose";

const MOMSchema = new mongoose.Schema({
    email: {type: "string", required: true},
    meeting_date: {type: Date, required: true},
    meeting_time: {type: String, required: true},
    meeting_duration: {type: Number, required: true},
    meeting_topic: {type: String, required: true},
    meeting_points: { type: [String], required: true }
})

const MOM = mongoose.model("MOM", MOMSchema);

export default MOM;