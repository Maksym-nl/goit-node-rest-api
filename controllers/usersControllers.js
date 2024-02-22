import Jimp from "jimp";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import path from "path";
import fs from "fs/promises";
import sendMail from "../helpers/sendMail.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import config from "../config.js";
import User from "../models/users.js";
import { response } from "express";

const { SECRET_KEY } = config;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });
  await sendMail({
    to: email,
    subject: "Hello user please verification your email",
    html: `<a href=${config.BASE_URL}/users/verify/${verificationToken}>Click there for verification your Email</a>`,
  });
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarUrl,
    },
  });
};
const updeteSubscription = async (req, resp) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const typsSubscription = ["starter", "pro", "business"];
  if (!typsSubscription.includes(subscription)) {
    throw HttpError(400, "Invalidate subscription ");
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  resp.json(result);
};
const verifyEmail = async (req, resp) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  resp.json({
    message: "Verification successful",
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
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
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

const resendEmail = async (req, resp) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const { verify, verificationToken } = user;
  if (verify) {
    throw (400, "Verification has already been passed");
  }
  await sendMail({
    to: email,
    subject: "Hello user please verification your email",
    html: `<a href=${config.BASE_URL}/users/verify/${verificationToken}>Click there for verification your Email</a>`,
  });
  res.json({
    message: "Verification email sent",
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
  updeteSubscription: ctrlWrapper(updeteSubscription),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendEmail: ctrlWrapper(resendEmail),
};
export default data;
