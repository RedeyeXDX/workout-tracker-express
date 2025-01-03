const Loginmodel = require("../model/Loginmodel");
const userSchema = require("../model/Loginmodel");

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await userSchema.findOne({ email });
  console.log(req.body);

  if (!user) return res.status(400).json("Invaild User");

  if (user.password !== password)
    return res.status(400).json("Invaild Password");

  res.json({
    user: {
      email: user.email,
      password: user.password,
    },
  });
};

const signup = async (req, res) => {
  const { password, email } = req.body;
  const existingUser = await Loginmodel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists. Please use a different email.",
    });
  }
  const newUser = await Loginmodel.create({
    email,
    password,
  });
  return res.status(201).json({ message: "Signup successful!", user: newUser });
};

module.exports = { login, signup };
