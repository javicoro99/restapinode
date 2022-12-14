const Clientes = require("../models/Clientes");

exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  try {
    // almacenar el registro
    await cliente.save();
    res.json({
      mensaje: "Se agrego un nuevo cliente",
    });
  } catch (e) {
    // si hay un error, console.log y next
    res.send(e); // para poder debuggear en el front se añade el send y envia el error
    next();
  }
};

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (e) {
    console.log(e);
    next();
  }
};

// Muestra un cliente por su Id

exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);
  if (!cliente) {
    res.json({ mensaje: "Ese cliente no existe" });
    next();
  }
  //Mostrar el cliente
  res.json(cliente);
};

// Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (e) {
    res.send(e);
    next();
  }
};

// Eliminar un cliente por su Id
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findByIdAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se elimino correctamente" });
  } catch (e) {
    console.log(e);
    next();
  }
};
