const {Router} = require('express');
const {ckeck, check} = require('express-validator');
require('dotenv').config();

const router = Router();
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
    res.json({
        status: 1,
        msq: "Todos los usuarios",
        usuarios
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

//EJEMPLO POST CON CONTROLADOR
router.post('/getUser',[
    check('id','ID de usuario obligatorio').not().isEmpty(),
    validateAtributes
], usuarioController.getUser
)

module.exports = router;
