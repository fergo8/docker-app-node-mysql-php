# 08. Entendendo Docker Compose

O **Docker Compose** é uma ferramenta que facilita na hora de subir os containers Docker. Com ele, em vez de termos todo o trabalho de gerar cada imagem com o comando **_docker build_** e depois subir cada container com **_docker run_**, nós podemos agilizar todo o trabalho em um único comando: o **_docker compose up_**. Nessa sessão bônus, o objetivo é apresentar o Docker Compose partindo do projeto já criado.

## Passo 1 - Instalar o Docker Compose e criar um arquivo YAML

A primeira coisa a se fazer é instalar o Compose. Contudo isso dependerá de qual seu sistema operacional, então sugiro uma olhada [nesta página da documentação do Docker](https://docs.docker.com/compose/install/).

A seguir, na página raíz do projeto, criamos um arquivo nomeado **_docker-compose.yml_**. É nesse arquivo que vamos escrever toda a configuração necessária para subirmos os três containers docker (o do MySQL, o da API Node e o do front-end em PHP) todos de uma vez, respeitando suas devidas particularidades.

No arquivo YAML (leia-se "iã-meu") nós definimos os serviços (containers) que devem ser levantados, portanto montarei ele em três partes, uma para cada container.

## Passo 2 - Escrever o arquivo YAML

Antes de definirmos os três serviços, precisamos informar a **versão**, que no meu caso defini como **"3.7"**. Em seguida, declaramos a área de **serviços**, ou seja, os containers que precisaremos subir.

### Serviço do MySQL

Nessa etapa vou criar primeiro o serviço referente ao banco de dados, atribuindo-lhe o nome de **_database_**. Observe como o código do arquivo **_docker-compose.yml_** está até o momento:

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

- image: nome da imagem do MySQL (o mesmo que havia no dockerfile do banco);
- container_name: nome do container a ser subido;
- environment: são as variáveis de ambiente que havíamos definido no dockerfile;
- volumes: o mesmo valor que usávamos na opção **-v** ao criarmos o container.

Estas são as tags com valores que já foram abordadas anteriormente. Além delas, temos duas novas:

- restart: reinicia o container sempre que houver crash;
- command: no caso deste serviço do MySQL, é recomendado na documentação que haja essa tag.

Agora, no mesmo arquivo **_docker-compose.yml_** vamos criar o segundo serviço referente à API Node.

### Serviço da API Node

### Serviço do front-end em PHP

## Passo 3 - Subir todos os serviços com Docker Compose Up
