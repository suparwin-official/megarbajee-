import User from "../models/User.js";
import Wallet from "../models/Wallet.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add balance to user
export const addBalance = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const wallet = await Wallet.findOne({ userId });

    wallet.balance += amount;
    await wallet.save();

    res.json({ message: "Balance added", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// block user
export const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, { blocked: true });

    res.json({ message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
