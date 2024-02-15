import bcript from "bcript";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import User from "../models/users.js";

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcript.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const data = {
  registration: ctrlWrapper(registration),
};
export default data;
