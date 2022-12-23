const addViaje = async (req,res) => {
    const fs = require("fs");
    const {agency,origin,destination,days,city,price,status} = req.body;
    const viaje = require("../../data/viajes.json");
    viaje.push({
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

module.exports = {
    addViaje
}