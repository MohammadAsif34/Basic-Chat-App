import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, success: false, message: err.message });
  }
};
