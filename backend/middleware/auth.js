const { TOKEN } = require("../services/token");
const { TOKEN_CONSTANTS } = require("../constants/tokenConstants");

exports.authenticate = async (req, res, next) => {
  const accessToken = req.header(TOKEN_CONSTANTS.AUTHORIZATION);

  if (!accessToken) {
    const refreshToken = req.cookies[TOKEN_CONSTANTS.TOKEN];

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = await TOKEN.verifyRefreshToken(refreshToken);
      req.user = decoded.user;

      const newAccessToken = TOKEN.generateAccessToken(req.user);

      res.header(TOKEN_CONSTANTS.AUTHORIZATION, newAccessToken);

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Session timeout", redirectUrl: "/login" });
    }
  }

  try {
    const isBlacklisted = await TOKEN.isBlacklisted(accessToken);

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is not valid", returnUrl: "/login" });
    }

    const decoded = TOKEN.verifyAccessToken(accessToken);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
