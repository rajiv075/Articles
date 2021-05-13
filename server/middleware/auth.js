const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../logger");

module.exports = function (req, res, next) {
  // Get the token form the header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    logger.error(err);
    logger.info(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
