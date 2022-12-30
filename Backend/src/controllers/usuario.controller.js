// Obtener usuario para login

const { signInCognito } = require("../middleware/cognito");

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
    //console.log(users)
    users.users.push({
        "name":name,
        "user":user,
        "mail":mail,
        "password":password,
        "role":role
    })
    const cogUsu = await signInCognito(user, password, mail);
    console.log("cogUsu")
    console.log(cogUsu)
    if(cogUsu.status === 0){
        if(cogUsu.msg.code === "UsernameExistsException"){
            res.json({
                status: 0,
                msg: "Error: el usuario ya existe en cognito",
            })
        }else if(cogUsu.msg.code === "InvalidParameterException"){
            res.json({
                status: 0,
                msg: "Error: el mail ya existe en cognito",
            })
        } else if(cogUsu.msg.code === "InvalidPasswordException"){
            res.json({
                status: 0,
                msg: "Error: la contraseña debe tener al menos 8 cararteres, una letra mayuscula, una minuscula y un numero",
            })
        }else{
            res.json({
                status: 0,
                msg: "Error: no se pudo crear el usuario en cognito",
            })
        }
    }else{
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