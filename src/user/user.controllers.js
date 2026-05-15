import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import Chat from "../models/Chat.model.js";

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
      message: "user fetched",
      user,
      contacts,
    });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

// done -> sent request
export const request = async (req, res) => {
  console.log("request");
  try {
    const to = req.params.to;
    const user1 = await User.findById(req.userId);
    const user2 = await User.findById(to);
    console.log(!user1);

    if (!user1 || !user2 || user1._id == user2._id) {
      console.log("\t=> Invalid request");
      return res
        .status(201)
        .json({ code: 201, success: false, message: "Invalid request" });
    }

    if (user1.requestSent.some((id) => id.equals(user2._id))) {
      console.log("\t=> already sent");
      return res
        .status(200)
        .json({ code: 200, success: true, message: "already sent" });
    }
    if (!user2 || !user1)
      return res
        .status(404)
        .json({ code: 404, success: false, message: "user not found!" });

    user1.requestSent.push(user2._id);
    user2.requestReceive.push(user1._id);
    await user2.save();
    await user1.save();

    console.log("\t=> sent");
    res.status(200).json({ code: 200, success: true, message: "request sent" });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

// done -> accept request
export const accept = async (req, res) => {
  console.log("accept");
  try {
    const from = req.params.from;
    const user1 = await User.findById(req.userId);
    const user2 = await User.findById(from);

    const chat = await Chat.findOne({
      type: "private",
      participants: { $all: [user1._id, user2._id] },
    });

    if (user1._id == user2._id || !!chat) {
      console.log("\t=> Invalid request");
      return res
        .status(201)
        .json({ code: 201, success: false, message: "invalid request" });
    }

    const newChat = new Chat({
      participants: [user1._id, user2._id],
    });

    user1.requestReceive = user1.requestReceive.filter((id) => id == user2._id);
    user2.requestSent = user1.requestSent.filter((id) => id == user1._id);
    // console.log(user1.requestReceive.filter((id) => id == user2._id));
    // console.log(user1.requestSent.filter((id) => id == user1._id));

    await newChat.save();
    await user1.save();
    await user2.save();

    console.log("\t=> accepted");
    res
      .status(200)
      .json({ code: 200, success: true, message: "request accepted" });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

//  -> search user
export const search = async (req, res) => {
  console.log("search");
  try {
    const email = req.query.email;
    console.log(email);
    const user = await User.find({
      email: { $regex: `^${email}`, $options: "i" },
    }).select("name email picture");

    if (user.length == 0) {
      console.log("\t=> not found");
      return res
        .status(201)
        .json({ code: 401, success: false, message: "not found" });
    }

    console.log("\t=> found");
    res.status(200).json({ code: 200, success: true, data: user });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

//  done -> update user
export const update_profile = async (req, res) => {
  console.log("search");
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      console.log("\t=> update failed");
      return res
        .status(201)
        .json({ code: 201, success: false, message: "failed" });
    }

    user.name = name;
    user.bio = bio;

    await user.save();

    console.log("\t=> updated");
    res.status(200).json({
      code: 200,
      success: true,
      message: "updated",
      data: { name, bio },
    });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};

//  -> new Password
export const new_password = async (req, res) => {
  try {
    const { newPassword, repeatPassword } = req.body;
    const user = await User.findById(req.userId).select("password");

    if (
      !newPassword ||
      !repeatPassword ||
      newPassword !== repeatPassword ||
      !user ||
      user?.password
    ) {
      return res
        .status(404)
        .json({ code: 404, success: false, message: "invalid password" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;
    user.email_verified = true;
    await user.save();

    console.log("\t=> new password");
    res.status(200).json({ code: 200, success: true, message: "updated" });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};
//  -> update password
export const update_password = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);
    if (!oldPassword || !newPassword || oldPassword === newPassword)
      return res
        .status(201)
        .json({ code: 201, success: false, message: "invalid password" });

    const user = await User.findById(req.userId).select("password");

    const match = await bcrypt.compareSync(oldPassword, user.password);

    if (!match) {
      console.log("\t=> invalid password");
      return res
        .status(201)
        .json({ code: 201, success: false, message: "invalid password" });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    console.log("\t=> password updated");
    res
      .status(200)
      .json({ code: 200, success: true, message: "password updated" });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};
