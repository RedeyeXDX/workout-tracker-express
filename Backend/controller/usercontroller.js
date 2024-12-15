const userSchema = require("../model/Loginmodel");

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await userSchema.findOne({ email });
  console.log(req.body);

  if (!user) return res.status(400).json("Invaild User");

  if (user.password !== password)
    return res.status(400).json("Invaild Password");

  res.json({ id: user._id, email: user.email });
};

module.exports = { login };
