const {Router} = require('express');
const {check} = require('express-validator');
require('dotenv').config();
var cors = require('cors')

const router = Router();
router.use(cors())

const viajeController = require('../controllers/viaje.controller');
const validateAtributes = require('../middleware/validateAtributes');

//EJEMPLO GET
router.get('/getViajes',(req, res)=>{
    const viajes = require("../../data/viajes.json");
    res.json({
        status: 1,
        msq: "Todos los viajes",
        viajes: viajes.viajes
    })
})


//Agregar viaje a json
router.post('/addViaje',[
    check('agency','Nombre de agencia obligatorio').not().isEmpty(),
    check('origin','Marca obligatorio').not().isEmpty(),
    check('destination','Placa obligatorio').not().isEmpty(),
    check('days','Modelo obligatoria').not().isEmpty(),
    check('price','Precio obligatorio').not().isEmpty(),
    check('status','Precio obligatorio').not().isEmpty(),
    validateAtributes
], viajeController.addViaje
)

//Eliminar viaje
router.post('/deleteViaje',[
    check('agency','Nombre de agencia obligatorio').not().isEmpty(),
    check('origin','Marca obligatorio').not().isEmpty(),
    check('destination','Placa obligatorio').not().isEmpty(),
    check('days','Modelo obligatoria').not().isEmpty(),
    check('price','Precio obligatorio').not().isEmpty(),
    validateAtributes
], viajeController.deleteViaje
)

//Agregar reservacion a json
router.post('/addReservacion',[
    check ('user','Usuario obligatorio').not().isEmpty(),
    check ('viaje','Informacion de viaje obligatorio').not().isEmpty(),
    validateAtributes
], viajeController.addReservacion)

module.exports = router;