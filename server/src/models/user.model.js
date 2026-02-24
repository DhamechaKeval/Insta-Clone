const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username alrady exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email alrady exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/Kevaldhamecha/user-profile-icon-avatar.webp",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
