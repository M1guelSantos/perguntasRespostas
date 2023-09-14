const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Dizendo para o express utilizar ejs como render HTML: 
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para aceitar arquivos estáticos (css,imagem,dados)

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json()); // Permite que seja lido dados de form enviados via JSON.

//Rotas:
app.get("/", (req,res) => {
    res.render("Index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => { //Mudando meu metodo para POST - Geralmente para receber dados form
    var titulo = req.body.titulo; // Pegando Informacoes form
    var descricao = req.body.descricao;
    res.send("titulo: " + titulo + " " + "descricao: " + descricao);
});

app.listen(8080, (erro ) =>{
    if(erro){
        console.log("Houve um erro inesperado")
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
});