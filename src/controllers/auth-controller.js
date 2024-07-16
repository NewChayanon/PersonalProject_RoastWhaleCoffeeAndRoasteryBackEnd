const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;

    const hasEmail = await userService.findEmail(data.email);

    if (hasEmail) {
      return res.status(400).json({ msg: "Register Invalid" });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ msg: "Register Success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const data = req.input;
    const searchEmail = await userService.findEmail(data.email);
    if (!searchEmail) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await hashService.compare(data.password, searchEmail.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const accessToken = jwtService.createToken({ id: searchEmail.id });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authController;
