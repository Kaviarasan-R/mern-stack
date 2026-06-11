import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // _id
        ref: "User",
        required: true
    }
});

export default mongoose.model("Employee", employeeSchema);