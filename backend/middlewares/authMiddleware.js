import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Adjusted to handle Bearer token format

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verified.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
  }
};

export default authMiddleware;
