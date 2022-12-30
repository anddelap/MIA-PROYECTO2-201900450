const express = require('express');
const cors = require('cors');
const { signInCognito } = require('./middleware/cognito');
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

async function createAdmin (user, password, email, name) {
    
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
    //const cleanuser = JSON.stringify(Cleanusers,null,4)
    //console.log(cleanuser);
    /* try {
        fs.writeFile("data/users.json",cleanuser)
        console.log("Admin creado correctamente");   
    } catch (error) {
        console.log(error);
        console.log("Error: no se pudo crear el admin");
    }
    */
    const cogUsu = await signInCognito(user, password, email);
    //console.log(cogUsu)
    if(cogUsu.status === 0){
        if(cogUsu.msg.code === "UsernameExistsException"){
            console.log({
                status: 0,
                msg: "Error: el usuario ya existe en cognito",
            })
        }else if(cogUsu.msg.code === "InvalidParameterException"){
            console.log({
                status: 0,
                msg: "Error: el mail ya existe en cognito",
            })
        } else if(cogUsu.msg.code === "InvalidPasswordException"){
            console.log({
                status: 0,
                msg: "Error: la contraseña debe tener al menos 8 cararteres, una letra mayuscula, una minuscula y un numero",
            })
        }else{
            console.log({
                status: 0,
                msg: "Error: no se pudo crear el usuario administrador en cognito",
            })
        }
    }else{

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