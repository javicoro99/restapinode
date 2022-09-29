const multer = require("multer");
const shortid = require("shortid");
const Productos = require("../models/Productos");
const fs = require("fs");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};
// Pasar la configuración en el campo
const upload = multer(configuracionMulter).single("imagen");
// sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (e) {
    if (e) {
      res.json({ mensaje: error });
    }
    return next();
  });
};
// Agregar nuevo producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Producto guardados" });
  } catch (e) {
    console.log(e);
    next();
  }
};

// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});

    res.json(productos);
  } catch (e) {
    console.log(e);
    next();
  }
};

// Muestra un proudcot en especifico por su ID
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "Ese producto no existe" });
    next();
  }
  // Mostrar producto
  res.json(producto);
};

// Actualizar un producto via id

exports.actualizarProducto = async (req, res, next) => {
  try {
    let nuevoProducto = req.body;

    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.params, idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }
    let producto = await Productos.findOneAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      {
        new: true,
      }
    );
    res.json(producto);
  } catch (e) {
    console.log(e);
    next();
  }
};

// Elimina un producto via ID

exports.eliminarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);
  const pathDeImagen = __dirname + `../../uploads/${producto.imagen}`;

  fs.unlink(pathDeImagen, (e) => {
    if (e) {
      console.log(e);
    }
    return;
  });
  try {
    await Productos.findByIdAndDelete({ _id: req.params.idProducto });

    res.json({ mensaje: "El producto se ah eliminado" });
  } catch (e) {
    console.log(e);
    next();
  }
};
