const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');



const getUser =async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;//argumentos opcionales del query
    const query = { estado: true };
    
// promise.all va a ejecutar ambas promesas de manera simultanea
    const [total, users]= await Promise.all([
        User.countDocuments(query),
        User.find({ query })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        users
    });


}


const potsUser = async (req, res = response) => {
    
    try {
        const { nombre, correo, password, role } = req.body;
        const user = new User({ nombre, correo, password, role });
        
        
        //Encriptar la contraseña
        const salt =  bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);
        
        //Guardar en DB
        await user.save();
        
        res.json({
            msg: 'post API - controlador',
            user
        });
    }
    catch (error) { 
        console.log(error);
        res.status(400).json({
            msg: 'error',
            error
        });
    }
         
 }

const putUser = async(req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, ...rest } = req.body;
    //TODO validar contra base de datos
    if (password) {
        const salt =  bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
        res.json({user});
          
}

const deleteUser = async (req, res = response) => { 
    const { id } = req.params;
    
   //cambiar el estado del usuario para cuidar la integridad referencial 
    const user = await User.findByIdAndUpdate(id, { estado: false });
    
    res.json(user);
}


const patchUser = (req, res = response) => { 
    res.json({
        msg: 'patch API - controlador'
    });
}




module.exports = {
    getUser,
    potsUser,
    putUser,
    deleteUser,
    patchUser
}
