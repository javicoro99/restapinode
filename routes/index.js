const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

// middle para proteger las rutas
const auth = require("../middleware/auth");
module.exports = function () {
  // Agrega nuevos clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  // Obtener todos los clietnes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  // Muestra un cliente en especifico
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  // Actualizar cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  // Eliminar Cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /*PRODUCTOS */
  // crear productos
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Muestra todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);

  // Muestra un productos especifico por su Id
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  // Actualizar productos
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  // Eliminar producto
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  // Busqueda de productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  /** * PEDIDOS * **/
  // Agregar nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  // mostrar pedido por id

  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  // Actualizar un pedido
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  // Eliminar Pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  // Usuarios

  router.post("/crear-cuenta", usuariosController.resgistrarUsuario);

  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);
  return router;
};
