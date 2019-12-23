# 08. Entendendo Docker Compose

O **Docker Compose** é uma ferramenta que facilita na hora de subir os containers Docker. Com ele, em vez de termos todo o trabalho de gerar cada imagem com o comando **_docker build_** e depois subir cada container com **_docker run_**, nós podemos agilizar todo o trabalho em um único comando: o **_docker compose up_**. Nessa sessão bônus, o objetivo é apresentar o Docker Compose partindo do projeto já criado.

## Passo 1 - Instalar o Docker Compose e criar um arquivo YAML

A primeira coisa a se fazer é instalar o Compose. Contudo isso dependerá de qual seu sistema operacional, então sugiro uma olhada [nesta página da documentação do Docker](https://docs.docker.com/compose/install/).

A seguir, na página raíz do projeto, criamos um arquivo nomeado **_docker-compose.yml_**. É nesse arquivo que vamos escrever toda a configuração necessária para subirmos os três containers docker (o do MySQL, o da API Node e o do front-end em PHP) todos de uma vez, respeitando suas devidas particularidades.

No arquivo YAML (leia-se "iã-meu") nós definimos os serviços (containers) que devem ser levantados, portanto montarei ele em três partes, uma para cada container.

## Passo 2 - Escrever o arquivo YAML

Antes de definirmos os três serviços, precisamos informar a **versão**, que no meu caso defini como **"3.7"**. Em seguida, declaramos a área de **serviços**, ou seja, os containers que precisaremos subir.

### Serviço do MySQL

Nessa etapa vou criar primeiro o serviço referente ao banco de dados, atribuindo-lhe o nome de **_database_**. Existem duas maneiras de fazer isso: ou usando aquele dockerfile do MySQL que havíamos escrito, ou adicionando as configurações necessárias direto no arquivo do **Docker Compose**. No caso desse serviço MySQL vamos optar pela segunda alternativa. Observe como o código do arquivo **_docker-compose.yml_** está até o momento:

```dockerfile
version: "3.7"
services:
    database:
        image: mysql
        command: --default-authentication-plugin=mysql_native_password
        container_name: mysql-container
        environment:
            MYSQL_ROOT_PASSWORD: app123
        volumes:
            - ./api/db/data:/var/lib/mysql
        restart: always
```

Calma, parece difícil de entender, mas já já você perceberá que conhece quase tudo o que está aí. Temos as seguintes tags:

- **image**: nome da imagem do MySQL (o mesmo que havia no dockerfile do banco);
- **container_name**: nome do container a ser subido;
- **environment**: são as variáveis de ambiente que havíamos definido no dockerfile;
- **volumes**: o mesmo valor que usávamos na opção **-v** ao criarmos o container.

Estas são as tags com valores que já foram abordadas anteriormente. Além delas, temos duas novas:

- **restart**: reinicia o container sempre que houver crash;
- **command**: no caso deste serviço do MySQL, é recomendado na documentação que haja essa tag.

Agora, no mesmo arquivo **_docker-compose.yml_** vamos criar o segundo serviço referente à API Node.

### Serviço da API Node

Para gerar o container da API Node via **_Docker Compose_** precisamos criar o segundo serviço. Estou chamando-o de **_api_**. Aqui nós vamos fazer diferente: usaremos o _dockerfile_ já existente para desenvolver o serviço. Observe:

```dockerfile
api:
    build: "./api"
    container_name: node-container
    volumes:
        - ./api:/home/node/app
    restart: always
    ports:
        - "9001:9001"
    depends_on:
        - database
```

Nesse arquivo temos como novidade as tags a seguir:

- **build**: define o local onde se encontra o _dockerfile_ a ser usado;
- **ports**: indica a porta do host e do container, equivalente à opção **-p**;
- **depends_on**: refere-se às dependências, ou seja, o serviço **api** dependerá do serviço **database**.

Feito isso, a próxima etapa do arquivo **Docker Compose** será criarmos o terceiro serviço, cujo intuito será gerar o container do **_front-end em PHP_**.

### Serviço do front-end em PHP

O serviço da aplicação front-end em PHP não possui nenhuma novidade. Para gerá-la, vamos descartar o _dockerfile_ escrito e vamos incluir todas as configurações direto no arquivo **_docker-compose.yml_**:

```dockerfile
website:
    image: "php:7.2-apache"
    container_name: php-container
    volumes:
        - ./website:/var/www/html
    restart: always
    ports:
        - "8888:80"
    depends_on:
        - api
```

Pronto! Agora é só rodar o Compose para subirmos os três containers automaticamente!

## Passo 3 - Subir todos os serviços com Docker Compose Up
