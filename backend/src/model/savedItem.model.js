import mongoose from 'mongoose';

const savedItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fooditems",
    required: true
  }
}, { timestamps: true })

// 🔥 Prevent duplicate saves
savedItemSchema.index({ user: 1, food: 1 }, { unique: true })

// 🔥 Optimize queries
savedItemSchema.index({ user: 1 })
savedItemSchema.index({ food: 1 })

const savedItemModel = mongoose.model("savedItem", savedItemSchema);
export default savedItemModel;