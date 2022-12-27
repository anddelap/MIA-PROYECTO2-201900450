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
    const viajeFiltrado = viaje.viajes.filter((v) => v.agency !== agency && v.origin !== origin && v.destination !== destination && v.days !== days && v.city !== city && v.price !== price);
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

module.exports = {
    addViaje,
    deleteViaje
}