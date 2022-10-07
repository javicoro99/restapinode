const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // autorización por el header
  const authHeader = req.get("Authorization");
  // te trae la parte de autorización del header es escencial

  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    error.statusCode = 401;
    throw error;
  }

  // obtener el token y verificarlo
  const token = authHeader.split(" ")[1];
  // normalmente viene de la siguiente manera Authotization: Bearer 3245325235225235
  // por ese  se separa solo para ver el token
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "LLAVESECRETA");
  } catch (e) {
    e.statusCode = 500;
    throw e;
  }

  // Si es un token valido, pero hay algun error
  if (!revisarToken) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }

  next();
};
