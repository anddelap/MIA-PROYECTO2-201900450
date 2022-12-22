const {Router} = require('express');
const {check} = require('express-validator');
require('dotenv').config();
var cors = require('cors')

const router = Router();
router.use(cors())

const usuarioController = require('../controllers/usuario.controller');
const validateAtributes = require('../middleware/validateAtributes');

router.get('/',(req, res)=>{
    res.json({
        status: 1,
        msq: "Api de usuarios"
    })
})

const usuarios = usuarioController.usuarios
//EJEMPLO GET 
router.get('/getUsers',(req, res)=>{
    const users = require("../../data/users.json");
    res.json({
        status: 1,
        msq: "Todos los usuarios",
        users: users.users
    })
})

//EJEMPLO GET DESDE LA RUTA
router.get('/getUser2/:id',(req, res)=>{
    const {id} = req.params;
    const usuario = usuarios[id];

    if(usuario){
        res.json({
            status: 1,
            msg: "Usuario encontrado",
            usuario
        })
    } else {
        res.json({
            status: 0,
            msg: "Usuario no encontrado",
            usuario
        })
    }
})

//Obtener usuario loggeado
router.post('/getUser',[
    check('user'),
    check('mail'),
    check('password','Contraseña de usuario obligatoria').not().isEmpty(),
    validateAtributes
], usuarioController.getUser
)

//Agregar usuario a json
router.post('/addUser',[
    check('name','Nombre de usuario obligatorio').not().isEmpty(),
    check('user','Nombre de usuario obligatorio').not().isEmpty(),
    check('mail','Correo de usuario obligatorio').not().isEmpty(),
    check('password','Contraseña de usuario obligatoria').not().isEmpty(),
    check('role','Rol de usuario obligatorio').not().isEmpty(),
    validateAtributes
], usuarioController.addUser
)

module.exports = router;
