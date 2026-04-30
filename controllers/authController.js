const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, phone, username, password } = req.body;

  const exist = await User.findOne({ username });
  if (exist) return res.json({ msg: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    username,
    password: hash
  });

  res.json({ msg: "Registered", user });
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ msg: "Wrong password" });

  const token = generateToken(user);

  res.json({ msg: "Login success", token, user });
};
