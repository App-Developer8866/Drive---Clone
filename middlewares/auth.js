const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.redirect("/user/login");
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUser = decoded;

    return next();
  } catch (error) {
    res.redirect("/user/login");
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = authMiddleware;