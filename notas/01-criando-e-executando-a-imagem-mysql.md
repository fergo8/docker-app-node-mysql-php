# 01. Criando e Executando a Imagem MySQL

## Passo 1 - Escrever o Dockerfile

A pasta **_app-node-mysql-php_** é nosso diretório raíz. Dentro dela criamos uma pasta chamada **_api_**, onde consta tudo referente à API Node que será utilizada. Criamos dentro de **_api_** uma pasta **_db_**, cuja finalidade é configurar o banco de dados que usaremos.

Dentro de **_db_** criamos o arquivo **_Dockerfile_**, responsável por configurar a imagem do MySQL. A princípio, este Dockerfile possuirá apenas a definição da imagem MySQL (linha 1) e uma variável de ambiente que armazena a senha do banco (linha 2):

```dockerfile
FROM mysql
ENV MYSQL_ROOT_PASSWORD app123
```

O comando **_from_** define a imagem e **_env_** declara variáveis de ambiente, no caso a senha root do banco que será "app123". Para conhecer quais variáveis de ambiente uma imagem Docker aceita é só procurar essa informação no [DockerHub da imagem em questão](https://hub.docker.com/_/mysql).

## Passo 2 - Construir a imagem do MySQL

Agora, na linha de comando (CMD para Windows ou Terminal para Linux/Mac), vamos executar no diretório raíz o comando para construir a imagem do MySQL conforme a configuração do Dockerfile.

```bash
docker build -t mysql-image -f api/db/Dockerfile .
```

O comando **_docker build_** constroi a imagem. Para tanto, são passadas duas flags:

- -t (tag): indica o nome da imagem, que você decide qual será;
- -f (file): indica o caminho do Dockerfile a ser construído e o caminho onde ele será gerado (no caso, o ponto significa a pasta atual).

Feito isso, a imagem será montada e ficará disponível para uso na lista de imagens docker em seu pc. Para ver essa lista, utilize o comando:

```bash
docker image ls
```

Feito isso, o próximo passo é colocar essa imagem para rodar.

## Passo 3 - Executar a imagem do MySQL
