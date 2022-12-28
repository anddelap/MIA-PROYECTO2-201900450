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

//Agregar reservacion de carro

const addReservacion = async (req,res) => {
    const fs = require("fs");
    const {user,car} = req.body;
    const reservacion = require("../../data/reservationsCars.json");
    const cars = require("../../data/cars.json");
    const newCars = cars.cars.filter(c => c.placa != car.placa);
    reservacion.reservations.push({
        "user":user,
        "car":car
    })
    //Esto es para cambiar el estado del carro a reservado
    cars.cars = newCars;
    cars.cars.push(car);
    fs.writeFile("data/cars.json", JSON.stringify(cars,null,4), (err) => {
        console.log(err)
    })
    //Esto es para agregar la reservacion
    fs.writeFile("data/reservationsCars.json", JSON.stringify(reservacion,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo crear la reservacion",
            })
        }else{
            res.json({
                status: 1,
                msg: "Reservacion creada correctamente",
            })
        }
    })
}

// Aceptar reservacion de carro

const acceptReservacion = async (req,res) => {
    const fs = require("fs");
    const {user,car} = req.body;
    const reservacion = require("../../data/reservationsCars.json");
    const cars = require("../../data/cars.json");
    const carsFiltrado = cars.cars.filter((c) => c.placa != car.placa);
    const reservacionFiltrada = reservacion.reservations.filter(r => r.user.user !== user.user || r.car.placa !== car.placa);
    cars.cars = carsFiltrado;
    cars.cars.push(car);
    fs.writeFile("data/cars.json", JSON.stringify(cars,null,4), (err) => {
        console.log(err)
    })
    reservacion.reservations = reservacionFiltrada;
    if(car.status==2){
        reservacion.reservations.push({
            "user":user,
            "car":car
        })
    }
    fs.writeFile("data/reservationsCars.json", JSON.stringify(reservacion,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo crear la reservacion",
            })
        }else{
            res.json({
                status: 1,
                msg: "Reservacion creada correctamente",
            })
        }
    })


}

module.exports = {
    addCar,
    deleteCar,
    addReservacion,
    acceptReservacion
}