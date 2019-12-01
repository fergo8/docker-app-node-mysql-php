# 01. Criando e Executando a Imagem MySQL

## Passo 1 - Escrever o Dockerfile

A pasta **_app-node-mysql-php_** é nosso diretório raíz. Dentro dela criamos uma pasta chamada **_api_**, onde consta tudo referente à API Node que será utilizada. Criamos dentro de **_api_** uma pasta **_db_**, cuja finalidade é configurar o banco de dados que usaremos.

Dentro de **_db_** criamos o arquivo **_Dockerfile_**, responsável por configurar a imagem do MySQL. A princípio, este Dockerfile possuirá apenas a definição da imagem MySQL (linha 1) e uma variável de ambiente que armazena a senha do banco (linha 2):

```dockerfile
FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD app123
```

O comando **_from_** define a imagem seguida da versão (no caso, a versão 5.7) e **_env_** declara variáveis de ambiente, no caso a senha root do banco que será "app123". Para conhecer quais variáveis de ambiente uma imagem Docker aceita é só procurar essa informação no [DockerHub da imagem em questão](https://hub.docker.com/_/mysql).

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

E agora o próximo passo é colocar essa imagem para rodar.

## Passo 3 - Executar a imagem do MySQL

Para executar a imagem do MySQL que criamos, basta utilizarmos o comando **_docker run_** seguido de algumas flags. Observe:

```bash
docker run -d --rm --name mysql-container mysql-image
```

Atribuimos três flags no comando acima, sendo elas as seguintes:

- -d (detach): flag opcional, mantém o terminal livre enquanto o comando é processado;
- --rm (remove): flag opcional, caso já exista um container de mesmo nome, remove o container antigo;
- --name: atribui um nome ao container que está sendo criado (no caso, o nome que criei é mysql-container).

Além das três flags, também foi atribuído ao comando docker run o nome da imagem docker que haviamos criado no passo anterior deste tutorial, cujo nome é _mysql-image_. Para saber se deu tudo certo e o container está executando, basta usar o comando a seguir:

```bash
docker ps
```

Este comando listará todos os containers que estiverem "em pé", ou seja, rodando. Note que a lista exibe um id do container, o nome da imagem usada, quando ele foi criado, o status dele, a porta em que está rodando e o nome que escolhemos para ele. Essas informações serão importantes para acessá-lo.

[Próxima Página >>](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/02-construindo-o-banco-de-dados.md)
