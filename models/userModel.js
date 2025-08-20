const mongoose = require("mongoose");

const schemaObj = {
  type: String,
  required: true,
  trim: true,
};

const userSchema = new mongoose.Schema({
  username: {
    ...schemaObj,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    ...schemaObj,
    unique: true,
    lowercase: true,
    minlength: [13, "Email must be at least 13 characters long"],
  },
  password: {
    ...schemaObj,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
