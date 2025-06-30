import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({

    firstname: {
        type: String,
        required: [true, 'Provide First Name'],
    },
    lastname: {
        type: String,
        required: [true, 'Provide First Name'],
    },
    username: {
        type: String,
        required: [true, "Provide Username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide Password"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Provide Email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Provide PhonNumber"],
    },
    roles: {
        type: String,
        default: "customer",
        enum: ["customer", "moderator", "admin"]
    },
    avatar: {
        type: String,
    }
})

export const userModel =  mongoose.model("user", userSchema)