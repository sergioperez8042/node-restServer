const { response } = require('express');




const getUser = (req, res = response) => {
    const { q, nombre, apiKey} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apiKey,
    });


}


const potsUser = (req, res = response) => {

    const {body} = req.body;
    console.log(body);
    res.status(201).json({
        msg: 'post API - controlador',
        body
            });
         
 }

const putUser = (req, res = response) => {
        const id = req.params.id;
        res.json({
            msg: 'put API - controlador',
            id
            
            
            });
          
}

const deleteUser = (req, res = response) => { 
    res.json({
        msg: 'delete API - controlador'
    });
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
