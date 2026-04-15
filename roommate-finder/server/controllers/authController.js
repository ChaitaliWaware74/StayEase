import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // check fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.json({
      msg: "Registered successfully",
      user
    });

  } catch (err) {
    console.error(err); // 🔥 IMPORTANT
    res.status(500).json({ msg: "Server error" });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      "secret123", // (later move to .env)
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    console.error(err); // 🔥 IMPORTANT
    res.status(500).json({ msg: "Server error" });
  }
};