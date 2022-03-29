//  first_name, last_name, email, pincode, age, gender

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true},
        lastName: {type: String, required: false},
        email: {type: String, required: true, unique: true},
        pincode: {type: Number, required: true},
        age: {type: Number, required: true},
        gender: {type: String, required: true, enum: ["male", "female", "other"]}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);