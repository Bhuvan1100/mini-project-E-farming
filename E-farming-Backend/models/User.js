// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    raspberryPiId: {
        type: String,
        required: true,
        unique: true 
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"] 
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
