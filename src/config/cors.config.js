const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5173",
];
export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.includes("vercel.app")) return callback(null, true);

    // if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS"));
  },
  credentails: true,
};
