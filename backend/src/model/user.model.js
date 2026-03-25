import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"]
    }
},{timestamps: true});


const userModel = mongoose.model('user', userSchema);

export default userModel;
