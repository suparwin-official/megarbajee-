const Wallet = require("../models/Wallet");

exports.play = async (req, res) => {
  const { bet } = req.body;

  let wallet = await Wallet.findOne({ userId: req.user.id });

  if (!wallet || wallet.balance < bet) {
    return res.json({ msg: "Not enough balance" });
  }

  const win = Math.random() < 0.5;

  if (win) {
    wallet.balance += bet * 2;
    await wallet.save();
    return res.json({ msg: "WIN 🎉", balance: wallet.balance });
  } else {
    wallet.balance -= bet;
    await wallet.save();
    return res.json({ msg: "LOSE ❌", balance: wallet.balance });
  }
};
