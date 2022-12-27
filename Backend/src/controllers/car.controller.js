// Crear Carros
const addCar = async (req,res) => {
    const fs = require("fs");
    const {agency,marca,placa,model,city,price,status} = req.body;
    const cars = require("../../data/cars.json");
    cars.cars.push({
        "agency":agency,
        "marca":marca,
        "placa":placa,
        "model":model,
        "city":city,
        "price":price,
        "status":status
    })
    fs.writeFile("data/cars.json", JSON.stringify(cars,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo crear el automovil",
            })
        }else{
            res.json({
                status: 1,
                msg: "Automovil creado correctamente",
            })
        }
    })
}

//Eliminar Carros
const deleteCar = async (req,res) => {
    const fs = require("fs");
    const {placa} = req.body;
    const cars = require("../../data/cars.json");
    const newCars = cars.cars.filter(car => car.placa != placa);
    if(newCars.length === cars.cars.length){
        res.json({
            status: 0,
            msg: "Error: el automovil no existe",
        })
    }else{
        cars.cars = newCars;
        fs.writeFile("data/cars.json", JSON.stringify(cars,null,4), (err) => {
            if (err) {
                res.json({
                    status: 0,
                    msg: "Error: no se pudo eliminar el automovil",
                })
            }else{
                res.json({
                    status: 1,
                    msg: "Automovil eliminado correctamente",
                })
            }
        })
    }
}


module.exports = {
    addCar,
    deleteCar
}