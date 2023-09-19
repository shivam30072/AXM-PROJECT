const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // extracting token from  req:{headers: {authorization: Bearer token}}
  const authHeaders = req.headers.authorization;

  if (!authHeaders?.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }

  // creating an array of the token string ["bearer", "token"]
  const token = authHeaders.split(" ")[1];

  try {
    // decoded the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { email: user.email, id: user.userId };
    next();
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
};

module.exports = authMiddleware;
