const { user: User } = require("../../../models");
const aes256 = require("aes256");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const transporter = require("../../services/main");

const sigIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validations
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    //search User
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Email is not validate" });
    }
    //validate password icorrect
    const decryptedPlainText = aes256.decrypt(
      process.env.password,
      user.password
    );

    if (decryptedPlainText !== password)
      return res.status(404).send({ msg: "Password Incorrect" });

    //Updated cod

    console.log(user.idUser);

    updateUser(user);

    const payload = {
      user: {
        id: user.idUser,
      },
    };

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 7200, // 2 hour
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token, user: user });
      }
    );

    // return res.status(200).send({ token: token, user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

//cod ramdom
const generateCod = () => {
  let possibility,
    randomNumber,
    generated = "";
  for (let i = 0; i < 6; i++) {
    possibility = Math.round(Math.random() * 100);
    randomNumber =
      possibility <= 10
        ? Math.floor(Math.random() * (57 - 48 + 1) + 48)
        : possibility > 10 && possibility <= 50
        ? Math.floor(Math.random() * (90 - 65 + 1) + 65)
        : Math.floor(Math.random() * (122 - 97 + 1) + 97);

    generated += String.fromCharCode(randomNumber);
  }

  return generated;
};

//Update cod user
const updateUser = async (data) => {
  try {
    let cods = generateCod();
    //Update info user
    let updateUser = {
      cod: cods,
    };
    let email = data.email;
    data.update(updateUser);
    // console.log("Hola", data.email);
    sendEmail(cods, email);
  } catch (error) {
    console.log(error);
    return res.status(500), send({ msg: "Internal error server" });
  }
};

const sendEmail = (cod, data) => {
  const email = {
    from: "Access Verification",
    to: data,
    subject: "Entry",
    html: `<p>the code to continue with your process of entering the platform is
    <span style="font-weight:bold" >${cod}</span>
    </p>`,
  };

  transporter.sendMail(email, function (error, info) {
    if (error) {
      console.log("Error", error);
      console.log("Esto es", email.to);
    } else {
      console.log("Email sent");
      res.status(200).json(req.body);
    }
  });
};

module.exports = {
  sigIn,
};
