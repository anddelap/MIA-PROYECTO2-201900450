// Obtener usuario para login

const getUser = async (req,res) => {
    const {user,password} = req.body;
    const users = require("../../data/users.json");
    const usuario = users.users.find((u) => u.user === user && u.password === password);
    if(usuario){
        res.json({
            status: 1,
            msg: "Usuario encontrado",
            usuario
        })
    } else {
        const usuario = users.users.find((u) => u.mail === user && u.password === password);
        if(usuario){
            res.json({
                status: 1,
                msg: "Usuario encontrado",
                usuario
            })
        } else {
            res.json({
                status: 0,
                msg: "Usuario/correo o contraseña incorrecto",
            })
        }
    }
}

//Agregar usuario a json
const addUser = async (req,res) => {
    const fs = require("fs");
    const {name,user,mail,password,role} = req.body;
    const users = require("../../data/users.json");
    users.users.push({
        "name":name,
        "user":user,
        "mail":mail,
        "password":password,
        "role":role
    })
    fs.writeFile("data/users.json", JSON.stringify(users,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo crear el usuario",
            })
        }else{
            res.json({
                status: 1,
                msg: "Usuario creado correctamente",
            })
        }
    })
}

//Eliminar usuario de json
const deleteUser = async (req,res) => {
    const fs = require("fs");
    const {user} = req.body;
    const users = require("../../data/users.json");
    const usuarios = users.users.filter((u) => u.user !== user);
    //users.users = usuarios;
    /* res.json({
        status: 0,
        existen: users.users,
        nuevo: usuarios
    }) */
    if(usuarios.length === users.users.length){
        res.json({
            status: 0,
            msg: "Error: el usuario no existe",
        })
    }else{
        users.users = usuarios;
        fs.writeFile("data/users.json", JSON.stringify(users,null,4), (err) => {
            if (err) {
                res.json({
                    status: 0,
                    msg: "Error: no se pudo eliminar el usuario",
                })
            }else{
                res.json({
                    status: 1,
                    msg: "Usuario eliminado correctamente",
                })
            }
        })
    }
}


module.exports = {
    getUser,
    addUser,
    deleteUser
}