const express = require("express");
const JogoSchema = require("./models/jogo");
const mongoose = require("./database");


const app = express(); 

const porta = 4000; 

app.use(express.json()); 



//CRUD
app.get("/", (req, res) => res.status(200).send({info : "Hello MongoDB"})); //

//Get lista
app.get("/jogos", async (req, res) => {
  const jogos = await JogoSchema.find();
  res.send({jogos});
});


// const getJogosValidos = () => jogos.filter(Boolean);

// const getJogoById = id => getJogosValidos().find(jogo => jogo.id === id);

// const getJogoIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id);

//Get ID
app.get("/jogos/:id", async (req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)){
    res.status(422).send({error: "Id inválido!"});
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({error : "Jogo não existe"});
    return;
  }

  res.send({jogo})

  // !jogo 
  //   ? res.status(404).send({error : "Jogo não existe"}) 
  //   : res.json(jogo); 
});

// POST
app.post("/jogos", async (req, res) => {
  const jogo = req.body;

  if (!jogo || !jogo.nome || !jogo.lancamento || !jogo.genero || !jogo.img) {
    res.status(400).send({error : 'Jogo inválido'});
    return;
  }
    
  const jogoSalvo =  await new JogoSchema(jogo).save();

  res.status(201).send({jogoSalvo})

});

// PUT
app.put("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)){
    res.status(422).send({error: "Id inválido!"});
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({error : "Jogo não existe"});
    return;
  }

  const novoJogo = req.body;

  if (!jogo || !jogo.nome || !jogo.lancamento || !jogo.genero || !jogo.img) {
    res.status(400).send({error : 'Jogo inválido'});
    return;
  }

  //espere o schema fazer no bd, buscar por 1 id
  await JogoSchema.findOneAndUpdate({_id: id}, novoJogo);
  const jogoAtualizado = await JogoSchema.findById(id);

  res.send({jogoAtualizado});

});

// DELETE
app.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)){
    res.status(422).send({error: "Id inválido!"});
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({error : "Jogo não encontrado"});
    return;
  }

  await JogoSchema.findByIdAndDelete(id);

  res.send({message: "Jogo excluído com sucesso"});
});



app.listen(porta, () => {
  console.log(`Servidor rodando em http:localhost:${porta}`);
});

