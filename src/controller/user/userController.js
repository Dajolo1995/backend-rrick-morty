const { user: User } = require("../../../models");
const aes256 = require("aes256");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(403).json({ msg: "El usuario ya existe" });
    }

    req.body.password = aes256.encrypt(process.env.password, password);
    const users = await User.create(req.body);

    const payload = {
      users: {
        id: users.idUser,
      },
    };

    jwt.sign(
      payload,
      process.env.Secreta,
      {
        expiresIn: 7200,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token, users: users });
      }
    );

    return res.status(200).send({ token: token, users: users });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
