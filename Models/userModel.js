import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required!'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email required!'],
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, 'Password required!'],
    }
});

export default mongoose.model("User", userSchema);