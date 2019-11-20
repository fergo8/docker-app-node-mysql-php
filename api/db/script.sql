CREATE DATABASE IF NOT EXISTS
appnodemysqlphp;

USE appnodemysqlphp;

CREATE TABLE IF NOT EXISTS pokemons (
    id INT(11) AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    PRIMARY KEY (id)
);

INSERT INTO pokemons VALUE(0, 'Pikachu', 2000);
INSERT INTO pokemons VALUE(0, 'Psyduck', 1800);
INSERT INTO pokemons VALUE(0, 'Eevee', 1700);
INSERT INTO pokemons VALUE(0, 'Squirtle', 2000);
INSERT INTO pokemons VALUE(0, 'Bulbasauro', 2000);
INSERT INTO pokemons VALUE(0, 'Charmander', 2000);