exports.isAdmin = (req, res, next) => {
  const user = req.user;
  if (!user["is_admin"]) {
    return res
      .status(401)
      .json({ msg: "You do not have permission to use this function" });
  }
  next();
};
