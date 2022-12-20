const express = require('express');
const app = express();
//const cors = require('cors');

app.use(express.json({limit: '50mb'}));

//ROUTES

app.get('/',(req,res)=>{
    res.json({
        status: "1",
        nombre: "Luis Andrés de la Peña Pineda",
        carne: "201900450"
    })
})

app.use('/usuarios',require('./routes/usuario.route.js'));


module.exports = app;