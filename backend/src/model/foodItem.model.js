import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Food item name is required"]
    },
    video: {
        type: String,
        required: [true, "Upload video"]
    },
    description :{
        type: String
    },
    foodPartner :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }

},{timestamps: true})

const foodItemModel = mongoose.model("fooditems", foodSchema)

export default foodItemModel
