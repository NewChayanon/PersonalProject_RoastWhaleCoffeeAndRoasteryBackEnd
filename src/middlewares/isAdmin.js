exports.isAdmin = (req, res, next) => {
  const user = req.user;
  if (!user["is_admin"]) {
    return res
      .status(403)
      .json({ msg: "You don't have permission." });
  }
  next();
};
