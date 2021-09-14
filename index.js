const express = require("express"); 

const app = express(); 

const porta = 4000; 

app.use(express.json()); 

const jogos = [
  {
    id: 1,
    nome: "Mortal Kombat",
    lancamento: 1992,
    genero: "luta",
    img: "https://2.bp.blogspot.com/-IgSNsptdQ9U/WV1QaDG5EhI/AAAAAAAADg4/4QvkM5w1JcgAWCJaW_Xj_P-qUgRT5dLmgCLcBGAs/s1600/Mortal%2BKombat%2B1%2B%2528PT-BR%2529%2B-%2B%255Bsnes-forever.blogspot.com%255D-20170705-174619.png"
  },
  {
    id: 2,
    nome: "Tekken",
    lancamento: 1994,
    genero: "Luta",
    img: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/ca/Tekken_1_capa.png/420px-Tekken_1_capa.png"
  },
  {
    id: 3,
    nome: "The Need for Speed",
    lancamento: 1994,
    genero: "Corrida",
    img:  "https://upload.wikimedia.org/wikipedia/pt/8/85/The_NFS_Video_cover.jpg"
  },
  {
    id: 4,
    nome: "Top Gear",
    lancamento: 1992,
    genero: "Corrida",
    img:  "https://i.ytimg.com/vi/kPL6lo3ITs0/maxresdefault.jpg"
  },
  {
    id: 5,
    nome: "Super Mario World",
    lancamento: 1990,
    genero: "Plataforma",
    img:  "https://upload.wikimedia.org/wikipedia/pt/thumb/0/06/Super-Mario-World.jpg/420px-Super-Mario-World.jpg"
  },
  {
    id: 6,
    nome: "Streets of Rage",
    lancamento: 1991,
    genero: "Luta",
    img:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc8erPHZKcbenmyIl9_litWIy7b_wVHGMF7w&usqp=CAU"
  },
  {
    id: 7,
    nome: "Sonic",
    lancamento: 1991,
    genero: "Plataforma",
    img:  "https://i.ytimg.com/vi/J06663Njops/maxresdefault.jpg"
  },
  {
    id: 8,
    nome: "Gran Turismo",
    lancamento: 1997,
    genero: "Simulador de corrida",
    img:  "https://upload.wikimedia.org/wikipedia/pt/thumb/4/47/Gran_Turismo_1997_capa.png/405px-Gran_Turismo_1997_capa.png"
  }
];


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

