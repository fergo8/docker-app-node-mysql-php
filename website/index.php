<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pokémons</title>
</head>

<body>
    <?php
    $result = file_get_contents("http://node-container:9001/pokemons");
    $pokemons = json_decode($result);
    ?>

    <table>
        <thead>
            <tr>
                <td>Pokémon</td>
                <td>Preço</td>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($pokemons as $pokemon) : ?>
                <tr>
                    <td><?php echo $pokemon->name; ?></td>
                    <td><?php echo $pokemon->price; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>

</html>