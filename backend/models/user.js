const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
  this.modifiedAt = new Date();
  next();
});

module.exports = mongoose.model("User", UserSchema);
