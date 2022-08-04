const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{



    constructor() {
    this.port = process.env.PORT
    this.app = express();
    this.userPath = '/api/user'; 
    this.authPath = '/api/auth';    
    
    //Database connection
    this.connectDB();    
        
    //Middlewares   
        
    this.middlewares();
        

    //Rutas de la aplicacion 
    this.routes();
    }

    //Database connection
    async connectDB() { 
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
    this.app.listen(this.port, () => {
    console.log('Servidor corriendo en puerto', this.port);
});


    }
}



module.exports = Server;