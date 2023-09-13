const express = require("express");
const app = express();

// Dizendo para o express utilizar ejs como render HTML.
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para aceitar arquivos estáticos (css,imagem,dados)

app.get("/:nome/:lang", (req,res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true 


    var produtos = [
        {nome:"Carne moida", preco: 45},
        {nome: "Picanha", preco: 100},
        {nome: "Maminha", preco: 50},
        {nome: "Colchão Mole", preco: 25}
    ]


    res.render("index", {
        nome: nome,
        lang: lang,
        msg: exibirMsg,
        produtos: produtos
    }); // Para desenhar arquivos HTML na tela com ejs
});


app.listen(8080, (erro ) =>{
    if(erro){
        console.log("Houve um erro inesperado")
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
});