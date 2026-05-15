import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";

// done -> google back
export const google_callback = async (req, res) => {
  const { credential } = req.body;
  console.log("google-callback HIT");
  try {
    if (!credential) {
      console.log("\t auth failed");
      return res
        .status(404)
        .json({ code: 404, success: false, message: "Authentication failed" });
    }

    const decode = jwt.decode(credential);

    if (!decode?.email || !decode?.sub) {
      console.log("\t decode failed");
      return res
        .status(404)
        .json({ code: 404, success: false, message: "Authentication failed" });
    }

    const user = await User.findOne({ email: decode.email });
    if (!user) {
      const newUser = new User({
        email: decode.email,
        name: decode.name,
        picture: decode.picture,
        sub: decode.sub,
        email_verified: decode.email_verified,
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("\t=> register");
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Register successfull",
        token,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("\t=> login");
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Login successfull",
      token,
    });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

// done -> login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      console.log("\t login failed");
      return res
        .status(400)
        .json({ code: 400, success: false, message: "Authentication failed" });
    }

    const user = await User.findOne({ email: email }).select("password");
    console.log(user);

    if (!user) {
      console.log("\t invalid credentials");
      return res
        .status(401)
        .json({ code: 401, success: false, message: "invalid credentials" });
    }

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      console.log("\t invalid credentials");
      return res
        .status(404)
        .json({ code: 401, success: false, message: "invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("\t=> login");
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Login successfull",
      token,
    });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

// done -> get me
export const get_me = async (req, res) => {
  console.log("get-me");
  try {
    const user = await User.findById(req.userId)
      .populate("requestSent", "name email picture")
      .populate("requestReceive", "name email picture");

    const chat = await Chat.find({
      type: "private",
      participants: req.userId,
    })
      .populate(
        "participants",
        "name email picture lastMessage lastMessageTime",
      )
      .sort({ updatedAt: -1 });

    const contacts = chat.map((chat) => {
      const contact = chat.participants.find(
        (p) => p._id.toString() !== user._id.toString(),
      );
      return { ...contact._doc, chatId: chat._id };
    });

    console.log("\t=> fetched");
    res.status(200).json({
      code: 200,
      success: true,
      user,
      contacts,
    });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};
