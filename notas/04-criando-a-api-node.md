# 04. Criando a API Node

## Passo 10 - Gerar o projeto com NPM

Para iniciar o projeto da API Node vamos usar o comando **npm init** na pasta da API. Portanto, caso você esteja no diretório raíz, não esqueça de navegar até o lugar certo:

```bash
cd api
npm init
```

Agora responda as perguntas que o NPM faz em todo início de projeto. Fique a vontade para preencher com as informações que quiser, só mantenha o **_main_** apontando para **_index.js_** para não haver problemas no decorrer deste tutorial.

Ao final, um **_package.json_** será gerado com todas as informações de configuração. Você pode acessar o meu [clicando aqui](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/api/package.json).

## Passo 11 - Instalar dependências

Vamos agora instalar três dependências que serão necessárias para facilitar nosso trabalho. A primeira se chama **Nodemon**, um utilitário capaz de dar _refresh_ na aplicação toda vez que nós salvarmos o código. Para instalá-lo, basta usar o seguinte comando no terminal:

```bash
npm install --save-dev nodemon
```

Lembre-se de manter a flag **_--save-dev_**, pois ela garante que o **Nodemon** seja adicionado ao projeto apenas no ambiente de desenvolvimento.

As outras duas dependências a serem instaladas são o framework **Express** e o módulo do **MySQL**. O primeiro serve para facilitar a criação das rotas da API, enquanto que o segundo permite a conexão da API com o banco de dados que já temos criado. Este é o comando para instalar os dois:

```bash
npm install --save express mysql
```

Agora está tudo pronto para começarmos a escrever nossa API Node.

[Próxima Página >>](https://github.com/fergo8/docker-app-node-mysql-php/blob/master/notas/05-escrevendo-a-api-node.md)
