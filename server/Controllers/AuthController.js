import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }

    const userModel = new User({ name, email, password });

    // Encrypt the password before saving to database
    userModel.password = await bcrypt.hash(password, 10);

    console.log(userModel.password);

    // Save user to database
    await userModel.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const errorMsg = "Auth failed or password is wrong";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: errorMsg,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      success: true,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
