# 06. Criando imagem e container da API

Os próximos passos são bastante semelhantes ao que já fizemos para gerar o container do MySQL na primeira parte deste tutorial. Precisamos criar uma imagem Docker da API Node e depois rodá-la em um container.

## Passo 15 - Gerar a imagem da API

Assim como no caso da imagem do MySQL, o primeiro passo para gerar a imagem da API é criarmos um **_Dockerfile_** na pasta **_api_**. Esse _Dockerfile_ conterá o seguinte código:

```dockerfile
FROM node:12-slim
WORKDIR /home/node/app
CMD npm start
```

Como já vimos, **_FROM_** define a imagem seguida da versão (no caso, a versão 12-slim do Node). Em seguida temos **_WORKDIR_**, que indica a estrutura interna de diretório do container onde a API rodará. E, por fim, temos **_CMD_**, que serve para rodar um comando específico via terminal dentro do container. No nosso caso, o **_CMD_** chamará o comando **_npm start_**, que faz referência ao comando que definimos lá no **_package.json_**, lembra? A saber, era **_nodemon ./src/index_**.

Com o Dockerfile preparado, vamos executar o mesmo **_docker build_** que haviamos realizado para gerar a imagem MySQL:

```dockerfile
docker build -t node-image -f api/Dockerfile .
```

Se quiser conferir o resultado, basta rodar em seguida o comando **_docker image ls_** para listar as imagem existentes no seu pc. Nessa altura deve haver uma **_mysql-image_** e uma **_node-image_**.

## Passo 16 - Subir o container da API

Este é o comando que usaremos para subir o container da API Node:

```dockerfile
docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --rm --name node-container node-image
```

O **_docker run_** já foi explicado anteriormente no [passo 1](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/01-criando-e-executando-a-imagem-mysql.md) e no [passo 8](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/03-persistindo-os-dados-no-container.md) deste tutorial. Contudo, aqui temos um novo elemento, a flag **_-p_**. Esta flag significa **_publish_** e serve para indicar para o host em qual porta o container irá rodar.

Como definimos a porta 9001, se estiver tudo certo e você tiver os dois containers em pé (no caso, **_node-container_** e **_mysql-container_**), então basta acessar em algum navegador o link **_localhost:9001/pokemons_** para ver como resultado o JSON com os dados que haviamos inserido no banco de dados.

[Próxima Página >>](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/07-criando-front-end-em-php.md)
