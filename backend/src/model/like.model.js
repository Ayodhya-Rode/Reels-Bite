import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fooditems',
    required: true
  }
}, { timestamps: true });

// 🔥 MOST IMPORTANT
likeSchema.index({ user: 1, food: 1 }, { unique: true })

// 🔥 Optional but good for performance
likeSchema.index({ user: 1 })
likeSchema.index({ food: 1 })

const likeModel = mongoose.model('like', likeSchema);

export default likeModel;