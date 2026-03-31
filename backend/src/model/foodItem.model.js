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
    },
    likeCount:{
        type: Number,
        default: 0
    },saveCount: {
    type: Number,
    default: 0
  }

},{timestamps: true})

const foodItemModel = mongoose.model("fooditems", foodSchema)

export default foodItemModel
