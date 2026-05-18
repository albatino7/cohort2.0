const jwt = require("jsonwebtoken");

async function authCheckMiddleWare(req, res, next) {
  const token = req.cookies.token;

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(409).json({
      message: "token is not Valid ",
    });
  }

  req.user = decoded;
  console.log(decoded);

  next();
}

module.exports = authCheckMiddleWare;
