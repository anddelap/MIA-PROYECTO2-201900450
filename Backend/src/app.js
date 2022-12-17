const express = require('express');
const app = express();
//const cors = require('cors');

app.use(express.json({limit: '50mb'}));

//ROUTES

app.get('/',(req,res)=>{
    res.json({
        status: "1",
        msg: "Hola mundo"
    })
})

app.use('/usuarios',require('./routes/usuario.route.js'));


module.exports = app;