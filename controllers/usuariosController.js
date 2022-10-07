const Usuarios = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.resgistrarUsuario = async (req, res) => {
  // leer los datos del usuario y colocarlos en eusuarios
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario Creado correctamente" });
  } catch (e) {
    console.log(e);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  // buscar el usuario
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    await res.status(401).json({ mensaje: "Ese usuario no existe" });
    next();
  } else {
    // El usuairo existe , verificar si el passwod es correcto o incorrecto
    if (!bcrypt.compareSync(password, usuario.password)) {
      // si el password es incorrecto
      await res.status(401).json({ mensaje: "Password Incoreecto" });
      next();
    } else {
      // password correcto, firmar el token
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1h",
        }
      );

      // retornar el TOKEN
      res.json({ token });
    }
  }
};
