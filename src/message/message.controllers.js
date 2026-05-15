import Message from "../models/Message.model.js";

// done -> get all messages
export const get_messages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chatId: chatId });
    res.status(200).json({ code: 200, success: true, messages });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};
// send messages
export const send = async (req, res) => {
  try {
    const { chatId, sender, message } = req.body;
    if (!chatId || !sender || !message)
      return res
        .status(404)
        .json({ code: 404, success: false, message: "failed!" });
    const msg = new Message({ chatId, sender, message });
    await msg.save();

    res.status(200).json({ code: 200, success: true, message: msg });
  } catch (err) {
    res.status(500).json({ code: 500, success: false, message: err.message });
  }
};
