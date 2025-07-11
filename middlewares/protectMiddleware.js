import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.split(" ")[0] == "Bearer") {
    try {
      const token = auth.split(" ")[1];
      console.log("protect token :: ",token);
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = verify._id;
      next();
    } catch (error) {
      res.json({
        code: 500,
        status: "NO_AUTHORIZE",
        message: error.message,
      });
    }
  } else {
    res.json({
      code: 404,
      status: "AUTH_ERR",
      message: "authorization failed",
    });
  }
};
