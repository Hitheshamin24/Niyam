const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // check if the token exists in authorization header
  // format :"Authorization: Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized-no token provided",
    });
  }
  try {
    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach logged-in user to req.user
    req.user = await User.findById(decode.id);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized - invalid token",
    });
  }
};
module.exports = { protect };
