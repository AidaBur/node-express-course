const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../db/users");

const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ msg: "User registered successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ msg: "Login successful", token });
};

const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Welcome, ${req.user.username}`,
    secret: "Here is your secret content!",
  });
};

module.exports = { register, login, dashboard };
