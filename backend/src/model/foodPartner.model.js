import mongoose from "mongoose";

const foofPartnerSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required : true
    }
},{timestamps: true})

const foodPartnerModel = mongoose.model("foodpartner", foofPartnerSchema)

export default foodPartnerModel
