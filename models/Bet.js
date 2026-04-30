import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  userId: String,
  game: String,
  amount: Number,
  status: {
    type: String,
    default: "pending"
  },
  result: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Bet", betSchema);
