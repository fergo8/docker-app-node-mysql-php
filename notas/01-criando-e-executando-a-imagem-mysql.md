# Criando e Executando a Imagem MySQL

A pasta *_app-node-mysql-php_* é nosso diretório raíz. Dentro dela criamos uma pasta chamada *_api_*, onde consta tudo referente à API Node que será utilizada. Criamos dentro de *_api_* uma pasta *_db_*, cuja finalidade é configurar o banco de dados que usaremos.

Dentro de *_db_* criamos o arquivo *_Dockerfile_*, responsável por configurar a imagem do MySQL. A princípio, este Dockerfile possuirá apenas a chamada da imagem MySQL (linha 1) e uma variável de ambiente que armazena a senha do banco (linha 2):

```docker
FROM mysql
ENV MYSQL_ROOT_PASSWORD app123
```

O comando *_from_* chama a imagem e *_env_* declara variáveis de ambiente, no caso a senha root do banco que será "app123". Para conhecer quais variáveis de ambiente uma imagem Docker aceita é só procurar essa informação no Docker Hub da imagem em questão.
