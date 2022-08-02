const express = require('express');
const cors = require('cors');
class Server{



    constructor() {
    this.port = process.env.PORT
    this.app = express();
    this.userPath = '/api/user';
        
    //Middlewares   
    this.middlewares();
        

    //Rutas de la aplicacion 
    this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        // Lectura y parseo del body 
        this.app.use(express.json());
        //Directorio público
    this.app.use(express.static('public'));
    }


    routes() { 
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
    this.app.listen(this.port, () => {
    console.log('Servidor corriendo en puerto', this.port);
});


    }
}



module.exports = Server;