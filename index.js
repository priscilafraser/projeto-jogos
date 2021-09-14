const express = require("express");

const app = express(); 

const porta = 4000; 

app.use(express.json()); 



//CRUD
app.get("/", (req, res) => res.status(200).send({Saudacao : "Seja bem vindo aos melhores jogos da década de 90!"})); //

//Get lista
app.get("/jogos", (req, res) => {
  res.json({jogos} );
});

const getJogosValidos = () => jogos.filter(Boolean);

const getJogoById = id => getJogosValidos().find(jogo => jogo.id === id);

const getJogoIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id);

//Get ID
app.get("/jogos/:idJogo", (req, res) => {
  const id = +req.params.idJogo;
  const jogo = getJogoById(id)

  !jogo 
    ? res.status(404).send({error : "Jogo não existe"}) 
    : res.json(jogo); 
});

// POST
app.post("/jogos", (req, res) => {
  const jogo = req.body;

  if (!jogo || !jogo.nome || !jogo.lancamento || !jogo.genero || !jogo.img)
    res.status(400).send({error : 'Jogo inválido'});

  const ultimoJogo =  jogos[jogos.length - 1]

  if (jogos.length) {
      jogo.id = ultimoJogo.id + 1
      jogos.push(jogo);
  }else {
      jogo.id = 1;
      jogos.push(jogo);
  }

  res.status(201).send({resp : "Novo jogo inserido com sucesso!"});
});

// PUT
app.put("/jogos/:id", (req, res) => {
  const id = +req.params.id;

  const jogoIndex = getJogoIndexById(id)

  //validacao para ver se filme existe no array
  if (jogoIndex < 0) {
    res.status(404).send({error : "Jogo não encontrado."})
    return;
  }

  const novojogo = req.body;

  if (!novojogo || !novojogo.nome || !novojogo.lancamento || !novojogo.genero || !novojogo.img) {
    res.status(400).send({error : 'Jogo inválido'});
    return;
  }

  const jogo = getJogoById(id)
  novojogo.id = jogo.id

  jogos[jogoIndex] = novojogo
  
  res.send("Atualização de jogo feita com sucesso!");
});

// DELETE
app.delete("/jogos/:id", (req, res) => {
  const id = +req.params.id;

  const jogoIndex = getJogoIndexById(id)
  if (jogoIndex < 0) {
    res.status(404).send({error : "Jogo não encontrado."})
    return;
  }

  jogos.splice(jogoIndex, 1);

  res.send({message : "Jogo deletado com sucesso!"});
});



app.listen(porta, () => {
  console.log(`Servidor rodando em http:localhost:${porta}`);
});

