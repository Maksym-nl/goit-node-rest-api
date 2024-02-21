import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import Jimp from "jimp";
import fs from "fs/promises";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import config from "../config.js";
import User from "../models/users.js";

const { SECRET_KEY } = config;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarUrl,
    },
  });
};

const updateAvatar = async (req, resp, next) => {
  const { _id, email } = req.user;
  const avatarDir = path.resolve("public", "avatars");
  const { path: tmpUploed, originalname } = req.file;
  const fileName = `${originalname}-${email}`;
  const resultUpload = path.join(avatarDir, fileName);
  const formatetAvatar = await Jimp.read(tmpUploed);
  formatetAvatar.resize(250, 250).quality(70).write(resultUpload);
  fs.rename(tmpUploed, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  resp.json({ avatarURL });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const data = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
};
export default data;
