const Role = require('../models/role');
const User = require('../models/user');



const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
      throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
  }


const emailExiste = async (correo = '') => {
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya esta registrado`);
  }
}


const existeUserId = async (id) => {
  const existeUser = await User.findById(id);
  if (!existeUser) {
    throw new Error(`El id no existe: ${id}`);
  }
}



module.exports = {
  esRolValido,
  emailExiste,
  existeUserId
}