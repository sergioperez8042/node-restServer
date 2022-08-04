const {response} = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');



const login = async(req, res = response) => { 

    const {correo, password} = req.body;
    try {


        //Verificar si el correo existe
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password incorrect',
            });
        }

        //verificar si el ususario esta en la DB y si esta activo

        if (!user.estado) {
            return res.status(400).json({
                msg: 'User / Password incorrect - estado: false ',
            });
            }


        //Verificar el password

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password incorrect - password '
            });
        }

        //Generar el JWT(Json web token)...lo que se va a grabar en el payload es el id
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }

    res.json({
        msg: 'Login OK',
        
    }) 
}



module.exports = {
    login
}
