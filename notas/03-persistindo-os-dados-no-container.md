# 03. Persistindo os dados no container

Para persistir os dados no container nós utilizaremos um **volume**. Esse recurso do Docker permite que uma pasta do pc seja utilizada para armazenar os dados que nós inserimos no MySQL do container.

## Passo 7 - Parar o container

Antes de tudo, caso seu container esteja em pé, precisaremos derrubá-lo. Para isso, execute no terminal:

```dockerfile
docker stop mysql-container
```

Feito isso, precisamos subir esse container novamente, mas dessa vez usando o recurso de **volumes**.

## Passo 8 - Rodar container com volume

O comando para subir nosso container de forma que ele aponte para um volume é exatamente o mesmo que já utilizamos quando subimos ele da primeira vez. Contudo, acrescentaremos uma nova flag seguida do caminho da pasta que será o volume:

```dockerfile
docker run -d -v $(pwd)/api/db/data:/var/lib/mysql --rm --name mysql-container mysql-image
```

Esta nova flag **-v** significa **volume** e recebe o caminho, como dito anteriormente. Note que o caminho possui duas partes: a primeira (antes do sinal de dois pontos) é o caminho onde os dados serão armazenados no pc host, enquanto que o segundo (depois do sinal de dois pontos) refere-se ao caminho do MySQL dentro do container.

Agora que nosso **_mysql-container_** está em pé e apontando para um volume, precisamos rodar outra vez o comando para executar o **_script.sql_** dentro do container:

```dockerfile
docker exec -i mysql-container mysql -uroot -papp123 < api/db/script.sql
```
