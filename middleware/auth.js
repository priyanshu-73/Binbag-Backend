import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this page" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
