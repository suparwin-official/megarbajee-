const Wallet = require("../models/Wallet");

// GET BALANCE
exports.balance = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });

  res.json({ balance: wallet ? wallet.balance : 0 });
};

// ADD MONEY
exports.deposit = async (req, res) => {
  const { amount } = req.body;

  let wallet = await Wallet.findOne({ userId: req.user.id });

  if (!wallet) {
    wallet = await Wallet.create({ userId: req.user.id, balance: amount });
  } else {
    wallet.balance += amount;
    await wallet.save();
  }

  res.json({ msg: "Deposit success", balance: wallet.balance });
};
