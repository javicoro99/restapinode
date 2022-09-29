const { default: mongoose, Schema } = require("mongoose");

const pedidosSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Clientes",
  },
  pedido: [
    {
      producto: {
        type: Schema.ObjectId,
        ref: "Productos",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
});
// NOTA!!!
// Al usar postman enviar los datos RAW en formato JSON por defecto estaran en Texto
module.exports = mongoose.model("Pedidos", pedidosSchema);
