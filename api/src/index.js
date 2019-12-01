// Importando módulos express e mysql
const express = require("express")
const mysql = require("mysql")

// Definindo porta e hostname
const PORT = 9001
const HOSTNAME = "0.0.0.0"

// Instanciando express
const app = express()

// Gerando conexão com banco de dados
const connection = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "app123",
    database: "appnodemysqlphp"
})

// Estabelecendo uma conexão
connection.connect()

// Criando uma rota para /pokemons
app.get("/pokemons", (req, res) => {

    // Criando uma query que seleciona totos os itens da tabela "pokemons"
    connection.query("SELECT * FROM pokemons", (err, result) => {

        // Verificando se há erro no retorno da query
        if(err) throw err

        // Enviando resultado em formato JSON
        res.send(result.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
        })))
    })
})

// Indicando a porta e hostname da aplicação
app.listen(PORT, HOSTNAME, () => {
    console.log("Ouvindo na porta:", PORT)
})