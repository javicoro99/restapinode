const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");

module.exports = function () {
  // Agrega nuevos clientes via POST
  router.post("/clientes", clienteController.nuevoCliente);

  // Obtener todos los clietnes
  router.get("/clientes", clienteController.mostrarClientes);

  // Muestra un cliente en especifico
  router.get("/clientes/:idCliente", clienteController.mostrarCliente);

  // Actualizar cliente
  router.put("/clientes/:idCliente", clienteController.actualizarCliente);

  // Eliminar Cliente
  router.delete("/clientes/:idCliente", clienteController.eliminarCliente);

  /*PRODUCTOS */
  // crear productos
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Muestra todos los productos
  router.get("/productos", productosController.mostrarProductos);

  // Muestra un productos especifico por su Id
  router.get("/productos/:idProducto", productosController.mostrarProducto);

  // Actualizar productos
  router.put(
    "/productos/:idProducto",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  // Eliminar producto
  router.delete("/productos/:idProducto", productosController.eliminarProducto);

  /** * PEDIDOS * **/
  // Agregar nuevos pedidos
  router.post("/pedidos", pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);

  // mostrar pedido por id

  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);

  // Actualizar un pedido
  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);

  // Eliminar Pedido
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);
  return router;
};
