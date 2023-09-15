const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");   

//Database

connection
    .authenticate() // Caso conecte corretamente ao bd o then é executado
    .then(() => {
        console.log("Conectado!")
    })
    .catch((msgErro) => { //Executado caso de algum erro
        console.log(msgErro);
    })


// Dizendo para o express utilizar ejs como render HTML: 
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para aceitar arquivos estáticos (css,imagem,dados)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Permite que seja lido dados de form enviados via JSON.

//Rotas:
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true}).then(perguntas => {
        res.render("Index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => { //Mudando meu metodo para POST - Geralmente para receber dados form
    var titulo = req.body.titulo; // Pegando Informacoes form
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");  // Funcao express. Redirecionamento
    });
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Houve um erro inesperado")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
});