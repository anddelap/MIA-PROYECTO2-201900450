const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
//const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(cors());

const USER = process.env.U;
const PASSWORD = process.env.PASS;
const MAIL = process.env.MAIL;
const NAME = process.env.NAME;

//console.log(USER);
//console.log(PASSWORD);
//console.log(MAIL);
//console.log(NAME);

function createAdmin (user, password, email, name) {
    
    const fs = require("fs");
    const users = require("../data/users.json");
    const admin = {
        "name":name,
        "user":user,
        "mail":email,
        "password":password,
        "role":"admin",
    }
    const Cleanusers = {
        "users":[
            admin
        ]
    }
    users.users.push(admin);
    const cleanuser = JSON.stringify(users,null,4)
    //console.log(cleanuser);
    /* try {
        fs.writeFile("data/users.json",cleanuser)
        console.log("Admin creado correctamente");   
    } catch (error) {
        console.log(error);
        console.log("Error: no se pudo crear el admin");
    }
    */
    fs.truncate('data/users.json', 0, function(){console.log('done')})
    fs.open("data/users.json", "a", (err, fd)=>{
        if(err){
            console.log(err.message);
        }else{
            fs.write(fd, JSON.stringify(users,null,4), (err, bytes)=>{
                if(err){
                    console.log(err.message);
                }else{
                    console.log(bytes +' bytes written');
                }
            })        
        }
    })
}


createAdmin(USER, PASSWORD, MAIL, NAME);

//ROUTES

app.get('/',(req,res)=>{
    res.json({
        status: "1",
        nombre: "Luis Andrés de la Peña Pineda",
        carne: "201900450"
    })
})

app.use('/usuarios',require('./routes/usuario.route.js'));
app.use('/carros',require('./routes/car.route.js'));
app.use('/viajes',require('./routes/viaje.route.js'));

module.exports = app;