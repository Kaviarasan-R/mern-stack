import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number, // { Editor: 2002 }
        Admin: Number // { Admin: 2003 }
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", userSchema);
