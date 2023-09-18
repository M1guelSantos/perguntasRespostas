const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");   
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] // Para mudar a ordem de exibição
    ]}).then(perguntas => {
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

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaID: pergunta.id}, // exibindo respostas que tenham o perguntaID igual ao id de pergunta da page
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas 
                });
            });
        }else{
            res.redirect("/");
        }
    }); // 1 dado sequelize
});

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo;
    var perguntaID = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect("/pergunta/" +perguntaID)
    });
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Houve um erro inesperado")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
});