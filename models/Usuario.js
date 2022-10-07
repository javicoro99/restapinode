const { default: mongoose, Schema } = require("mongoose");

const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
