//Agregar un viaje
const addViaje = async (req,res) => {
    const fs = require("fs");
    const {agency,origin,destination,days,city,price,status} = req.body;
    const viaje = require("../../data/viajes.json");
    viaje.viajes.push({
        "agency": agency,
        "origin": origin,
        "destination": destination,
        "days": days,
        "city": city,
        "price": price,
        "status": status,
    })
    fs.writeFile("data/viajes.json", JSON.stringify(viaje,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo crear el viaje",
            })
        }else{
            res.json({
                status: 1,
                msg: "Viaje creado correctamente",
            })
        }
    })
}

//Eliminar un viaje
const deleteViaje = async (req,res) => {
    const fs = require("fs");
    const {agency,origin,destination,days,city,price} = req.body;
    const viaje = require("../../data/viajes.json");
    const viajeFiltrado = viaje.viajes.filter((v) => v.agency !== agency || v.origin !== origin || v.destination !== destination || v.days !== days || v.city !== city || v.price !== price);
    if(viajeFiltrado.length === viaje.viajes.length){
        res.json({
            status: 0,
            msg: "Error: el viaje no existe",
        })
    }else{
        viaje.viajes = viajeFiltrado;
        fs.writeFile("data/viajes.json", JSON.stringify(viaje,null,4), (err) => {
            if (err) {
                res.json({
                    status: 0,
                    msg: "Error: no se pudo eliminar el viaje",
                })
            }else{
                res.json({
                    status: 1,
                    msg: "Viaje eliminado correctamente",
                })
            }
        })
    }
}

//Agregar reservacion de carro

const addReservacion = async (req,res) => {
    const fs = require("fs");
    const {user,viaje} = req.body;
    const reservacion = require("../../data/reservationsViajes.json");
    const viajes = require("../../data/viajes.json");
    const viajeFiltrado = viajes.viajes.filter((v) => v.agency !== viaje.agency || v.origin !== viaje.origin || v.destination !== viaje.destination || v.days !== viaje.days || v.city !== viaje.city || v.price !== viaje.price);
    reservacion.reservations.push({
        "user":user,
        "viaje":viaje
    })
    //Esto cambia estado de reservado en el archivo de viajes.json 
    viajes.viajes = viajeFiltrado;
    viajes.viajes.push(viaje);
    fs.writeFile("data/viajes.json", JSON.stringify(viajes,null,4), (err) => {
        console.log(err)
    })
    //Esto agrega la reservacion al archivo de reservaciones.json
    fs.writeFile("data/reservationsViajes.json", JSON.stringify(reservacion,null,4), (err) => {
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

// Aceptar reservacion de viaje

const acceptReservacion = async (req,res) => {
    const fs = require("fs");
    const {user,viaje} = req.body;
    const reservacion = require("../../data/reservationsViajes.json");
    const viajes = require("../../data/viajes.json");
    const viajeFiltrado = viajes.viajes.filter((v) =>v.agency !== viaje.agency || v.origin !== viaje.origin || v.destination !== viaje.destination || v.days !== viaje.days || v.city !== viaje.city || v.price !== viaje.price);
    const reservacionFiltrada = reservacion.reservations.filter((r) => r.user.user !== user.user || r.viaje.agency !== viaje.agency || r.viaje.origin !== viaje.origin || r.viaje.destination !== viaje.destination || r.viaje.days !== viaje.days || r.viaje.city !== viaje.city || r.viaje.price !== viaje.price);
    viajes.viajes = viajeFiltrado;
    viajes.viajes.push(viaje);
    fs.writeFile("data/viajes.json", JSON.stringify(viajes,null,4), (err) => {
        console.log(err)
    })
    reservacion.reservations = reservacionFiltrada;
    if(viaje.status==2){
        reservacion.reservations.push({
            "user":user,
            "viaje":viaje
        })
    }
    fs.writeFile("data/reservationsViajes.json", JSON.stringify(reservacion,null,4), (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "Error: no se pudo gestionar la reservacion",
            })
        }else{
            res.json({
                status: 1,
                msg: "Reservacion gestionada correctamente",
            })
        }
    })

}
module.exports = {
    addViaje,
    deleteViaje,
    addReservacion,
    acceptReservacion
}