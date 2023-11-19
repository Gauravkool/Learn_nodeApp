const model = require("../model/user");
const User = model.User;
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const user = await User(req.body);
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET);
    user.token = token;
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
