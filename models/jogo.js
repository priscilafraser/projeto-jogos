const mongoose = require("../database/index");

//document padrão, faz parte do restfull
const JogoSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    lancamento:{
        type: Number,
        require: true
    },
    genero:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true
    }
});

const Jogo = mongoose.model("Jogo", JogoSchema);

module.exports = Jogo;