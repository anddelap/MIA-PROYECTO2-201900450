const {Router} = require('express');
const {check} = require('express-validator');
require('dotenv').config();
var cors = require('cors')

const router = Router();
router.use(cors())

const carController = require('../controllers/car.controller');
const validateAtributes = require('../middleware/validateAtributes');

//Agregar carro a json
router.post('/addCar',[
    check('agency','Nombre de agencia obligatorio').not().isEmpty(),
    check('marca','Marca obligatorio').not().isEmpty(),
    check('placa','Placa obligatorio').not().isEmpty(),
    check('model','Modelo obligatoria').not().isEmpty(),
    check('city','Ciudad obligatorio').not().isEmpty(),
    check('price','Precio obligatorio').not().isEmpty(),
    check('status','Precio obligatorio').not().isEmpty(),
    validateAtributes
], carController.addCar
)

//Eliminar Carros
router.post('/deleteCar',[
    check('placa','Placa obligatorio').not().isEmpty(),
    validateAtributes
], carController.deleteCar
)

module.exports = router;