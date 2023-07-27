const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name."],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    minlength: 6,
    maxlength: 25,
    select: false, // Will not send this field when User model requested via API
  },
  role: {
    type: String,
    required: [true, "Please add a role."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
