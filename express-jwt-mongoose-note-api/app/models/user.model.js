const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    hash_password: { type: String, required: true },
  },
  { timeStamp: true }
);

//methods
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("User", UserSchema);
