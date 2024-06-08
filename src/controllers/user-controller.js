const userController = {};

userController.getUser = (req, res) => {
  res.json({ user: req.user });
};

module.exports = userController;
