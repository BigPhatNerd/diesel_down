const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {

    return res.status(401).json({ mes: "No token, authorization denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
