# 02. Construindo o Banco de Dados

Por enquanto nós criamos uma imagem Docker do MySQL e subimos um container com essa imagem, chamado **_mysql-container_**. Agora, vamos criar o banco de dados dentro do container e inserir alguns dados.

## Passo 4 - Criar um script SQL

O objetivo será criarmos uma espécie de loja de bonecos Pokémon. Sendo assim, precisamos de um banco de dados com uma tabela. Para tanto, na pasta **_db_** criamos um novo arquivo que vamos denominar **_script.sql_**, cujo conteúdo será o script para montar o banco com a tabela e os dados inseridos. Segue o conteúdo:

```sql
-- Cria o banco chamado "appnodemysqlphp"
CREATE DATABASE IF NOT EXISTS
appnodemysqlphp;

USE appnodemysqlphp;

-- Cria a tabela "pokemons" com as colunas "id", "name" e "price"
CREATE TABLE IF NOT EXISTS pokemons (
    id INT(11) AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    PRIMARY KEY (id)
);

-- Insere seis pokemons como dados na tabela
INSERT INTO pokemons (0, 'Pikachu', 2000);
INSERT INTO pokemons (0, 'Psyduck', 1800);
INSERT INTO pokemons (0, 'Eevee', 1700);
INSERT INTO pokemons (0, 'Squirtle', 2000);
INSERT INTO pokemons (0, 'Bulbasauro', 2000);
INSERT INTO pokemons (0, 'Charmander', 2000);
```

Feito isso, agora precisamos executar dentro do container este script recém criado.

## Passo 5 - Executar o script no container

Para efetuar a execução do script SQL dentro do container, basta utilizar o seguinte comando Docker:

```dockerfile
docker exec -i mysql-container mysql -uroot -p app123 < api/db/script.sql
```

O comando **_docker exec_** permite que nós rodemos comandos dentro dos containers. A sintaxe do **_docker exec_** aceita a flag **-i**, que garante interação com o prompt do container, ou seja, sem ela nós não conseguiríamos executar comandos dentro do nosso container. Em seguida temos o nome do container que vamos utilizar, no caso **_mysql-container_**.

O restante do comando refere-se ao comando que usaremos dentro do prompt do container, que no nosso caso é **_mysql -uroot -p app123 < api/db/script.sql_**. Explicando melhor o que tudo isso significa (para quem conhece poico de MySQL):

- mysql: parte do comando que invoca o MySQL dentro do container;
- -uroot: indica que o MySQL será acessado como usuário root;
- -p (password): indica a senha do usuário root;
- app123: é a senha que configuramos no Dockerfile da imagem do MySQL, lembra?;
- < api/db/script.sql: é o caminho onde se encontra o script em SQL que iremos rodar no container.

Entendendo isso, ficará fácil de descobrir como usar outros comandos dentro dos containers que você criar. Em outras palavras, basta usar:

```dockerfile
docker exec -i [nome do container] [comando a ser rodado dentro do container]
```

Feito isso, se tudo ocorreu corretamente, haverá um banco de dados no container chamado **_appnodemysqlphp_**, com uma tabela **_pokemons_**, com seis "bonecos pokemon" inseridos nela.

## Passo 6 - Conferir se o script rodou
