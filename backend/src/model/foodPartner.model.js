import mongoose from "mongoose";

const foofPartnerSchema = new mongoose.Schema({
    restaurantName : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"]
    },
    address:{
        type: String,
        required: true
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
        required : true
    },
    avatar:{
        type:String,
        required: true
    }
},{timestamps: true})

const foodPartnerModel = mongoose.model("foodpartner", foofPartnerSchema)

export default foodPartnerModel
