
const usuarios = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
}

const getUser = async (req,res) => {
    const {id,nombre} = req.body;
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

}

module.exports = {
    getUser,
    usuarios
}