const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlradyExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlradyExists) {
    return res.status(409).json({
      message: `User is alrady exists with this ${
        isUserAlradyExists.email === email ? "email" : "username"
      }`,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({
      message: `Invalid username or email`,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is Invalid.",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const getMeController = async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id);

  res.status(200).json({
    message: `Details fetched successfully`,
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

module.exports = {
  registerController,
  loginController,
  getMeController,
};
