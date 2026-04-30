const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: String,
  type: String, // deposit, withdraw, win, lose
  amount: Number,
  status: { type: String, default: "success" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
