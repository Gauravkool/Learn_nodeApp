const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone email!`,
    },
    required: true,
  },
  password: { type: String, minLengh: 6, required: true },
  token: String,
});

exports.User = mongoose.model("User", userSchema);
