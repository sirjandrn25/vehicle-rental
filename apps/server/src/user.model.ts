const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  email_verified: Boolean,
  password: String,
  role: ["ADMIN", "USER"],
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
