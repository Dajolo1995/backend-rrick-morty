const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token del header
  const token = req.header("Authorization");

  //revisar si no hay token
  if (!token) {
    return res.status(403).json({ msg: "invalid permission, please login" });
  }
  //Validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Noy Autorized!" });
  }
};
