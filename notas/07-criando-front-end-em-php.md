# 07. Criando front-end em PHP

A terceira e última parte deste tutorial busca montar um front-end básico que consuma a API Node que acabamos de desenvolver. Essa será a parte mais simples do tutorial.

## Passo 17 - Escrever página PHP

Para começar, vamos criar na raíz do projeto uma pasta chamada **website**, onde ficará o arquivo **_index.php_**. Após criar tanto a pasta quanto o arquivo, insira o seguinte código:

```php
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pokémons</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <?php
    $result = file_get_contents("http://node-container:9001/pokemons");
    $pokemons = json_decode($result);
    ?>

    <div class="container">
        <table class="table table-sm table-dark table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pokémon</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($pokemons as $pokemon) : ?>
                    <tr>
                        <td><?php echo $pokemon->id; ?></td>
                        <td><?php echo $pokemon->name; ?></td>
                        <td><?php echo $pokemon->price; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>

</html>
```

Como este tutorial não tem o objetivo de ensinar HTML nem PHP, não acho válido explicar em detalhes todo o código. Basta compreendermos que trata-se de uma tabela com três colunas (ID, Pokémons e Preço). Usei o [Bootstrap](https://getbootstrap.com/) para estilizá-la um pouco, mas sinta-se a vontade para mexer no layout da página!

Em todo caso, a linha que nos interessa é a que contém a função **_file_get_contents()_**. Ela é responsável por acessar o conteúdo JSON de nossa API Node e apresentá-lo dentro da tabela. Feito isso, vamos escrever um novo **_Dockerfile_** para gerar a imagem PHP.

## Passo 18 - Gerar imagem PHP

Para gerar a imagem PHP do nosso front-end precisamos primeiro criar o novo _Dockerfile_ dentro da pasta _website_. Neste arquivo teremos a indicação da imagem oficial do **_PHP 7.2 com Apache_**, juntamente com o caminho de diretórios onde o projeto ficará armazenado dentro do futuro container que subiremos. Observe:

```dockerfile
FROM php:7.2-apache
WORKDIR /var/www/html
```

Uma vez que tenhamos preparado o _Dockerfile_, agora vamos no terminal executar aquele mesmo comando de sempre para gerarmos a imagem:

```dockerfile
docker build -t php-image -f website/Dockerfile .
```

**Obs: importante nunca esquecer o ponto no final do comando, pois ele indica o contexto da montagem da imagem.**

## Passo 19 - Gerar container PHP

Tendo pronta a imagem do PHP, vamos finalizar este tutorial subindo o container. Basicamente é o mesmo comando **_docker run_** de sempre, não há nada de novo a não ser trocarmos o caminho de diretórios do volume e o número das portas. Observe:

```dockerfile
docker run -d -v $(pwd)/website:/var/www/html -p 8888:80 --link node-container --name php-container php-image
```

Repare que estamos fazendo um redirecionamento da porta 80 do container para a porta 8888 do pc host.

E com isso terminamos este tutorial. Espero que tenha sido uma leitura proveitosa. Agradecimentos ao Ayrton do canal [Programador a Bordo](https://www.youtube.com/watch?v=Kzcz-EVKBEQ&t=3s) por ter compartilhado esse conhecimento, viabilizando a escrita deste tutorial. Até a próxima!
