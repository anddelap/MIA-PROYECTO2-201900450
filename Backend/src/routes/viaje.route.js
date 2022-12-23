const {Router} = require('express');
const {check} = require('express-validator');
require('dotenv').config();
var cors = require('cors')

const router = Router();
router.use(cors())

const viajeController = require('../controllers/viaje.controller');
const validateAtributes = require('../middleware/validateAtributes');

//Agregar carro a json
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

module.exports = router;