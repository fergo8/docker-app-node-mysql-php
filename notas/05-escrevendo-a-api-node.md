# 05. Escrevendo a API Node

Agora vamos realizar três passos para desenvolver nossa API Node, conectando-a ao banco de dados no MySQL.

## Passo 12 - Configurar comando start

Primeiro temos que configurar o comando start dentro do nosso **_package.json_**. Portanto, abra-o com algum editor de código de sua preferência e, dentro de **_scripts_**, acrescente a seguinte informação:

```json
"scripts": {
    "start": "nodemon ./src/index"
  },
```

Isso significa que o projeto dará _start_ com o **Nodemon**, iniciando o arquivo **_index.js_** que se encontra na pasta **_src_**. A seguir, precisamos criar essa estrutura, sendo assim crie a pasta _src_ dentro de _api_, e depois crie o arquivo _index.js_ dentro de _src_. É nesse arquivo que escreveremos a API Node.

## Passo 13 - Descobrir o IP Address do container MySQL

Antes de sair escrevendo código desenfreadamente, precisamos de uma informação importante: o **_IP Address_** do container MySQL. Acontece que os containers Docker por padrão ficam todos numa mesma rede virtual, por isso conseguem se reconhecer pelo IP. Para descobrir qual é o **_IP Address_** do container MySQL (vamos precisar mais tarde dessa informação), basta rodar em linha de comando o **_docker inspect_**:

```bash
docker inspect mysql-container
```

Feito isso, você terá acesso a uma série de informações do container em questão. Uma delas é o tal do **_IP Address_**. Encontre-o e guarde o número para mais tarde.

## Passo 14 - Escrever o index.js

Enfim, hora de codar! Tendo os módulos Express e MySQL instalados, vamos começar importando-os e depois definindo as constantes de _porta_ e _hostname_:

```javascript
// Importando módulos express e mysql
const express = require("express")
const mysql = require("mysql")

// Definindo porta e hostname
const PORT = 9001
const HOSTNAME = "0.0.0.0"
```

No caso, definimos a porta como 9001. Depois disso precisamos instanciar o Express e gerar uma conexão com o banco de dados. A conexão será feita através do método **_createConnection()_**, que recebe como parâmetro um objeto JSON contendo:

- host: IP Address do container MySQL (aquele número que tínhamos guardado);
- user: usuário do MySQL (no caso, root);
- password: senha que havíamos definido no Dockerfile do banco de dados (app123);
- database: nome do banco de dados a ser usado (no meu caso, appnodemysqlphp).

Segue o código JavaScript:

```javascript
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
```

O método **_connect()_** inicia a conexão com o banco de dados recém definido. Agora temos que criar uma rota que buscará todos os dados contidos no banco de dados do MySQL e, em seguida, mostrá-los na tela em forma de JSON:

```javascript
// Criando uma rota para /pokemons
app.get("/pokemons", (req, res) => {

    // Criando uma query que seleciona todos os itens da tabela "pokemons"
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
```

Por fim, é necessário indicar a porta em que a API Node irá rodar. O método **_listen()_** resolverá isso da seguinte maneira:

```javascript
// Indicando a porta e hostname da aplicação
app.listen(PORT, HOSTNAME, () => {
    console.log("Ouvindo na porta:", PORT)
})
```

Pronto! Terminamos de escrever nossa API. Se quiser ver meu código completo, [clique aqui](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/api/src/index.js). Para finalizar, na próxima parte desse tutorial nós criaremos a imagem dessa API e depois subiremos um container Docker.

[Próxima Página >>](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/06-criando-imagem-e-container-da-api.md)
