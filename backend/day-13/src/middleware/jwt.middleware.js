require("dotenv").config();
const jwt = require("jsonwebtoken");

async function jwtMiddleware(req, res, next) {
  const token = req.cookies.token;
  //   console.log(token);

  if (!token) {
    res.status(409).json({
      message: "Token is Expires ",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(409).json({ message: "token is not veryfied" });
  }
}

module.exports = jwtMiddleware;
