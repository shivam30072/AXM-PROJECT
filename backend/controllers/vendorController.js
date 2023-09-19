const Vendor = require("../model/vendorModel");
const asyncHandler = require("express-async-handler");

const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const userExists = await Vendor.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Vendor.create({ email, password });
  if (user) {
    res.status(201).json({ user });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const user = await Vendor.findOne({ email });

  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Incorrect Password");
    }
    const token = user.createJwt();

    res.status(200).json({ user, token });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

module.exports = { signupUser, loginUser };
