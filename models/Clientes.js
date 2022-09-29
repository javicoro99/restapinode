const { default: mongoose, Schema } = require("mongoose");

const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true, // Elimina los espacios vacios en los datos enviados
  },
  apellido: {
    type: String,
    trim: true,
  },
  empresa:{
    type:String,
    trim:true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Clientes", clientesSchema);
