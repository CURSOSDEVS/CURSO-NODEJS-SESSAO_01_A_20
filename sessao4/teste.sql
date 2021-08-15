CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade int
);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'Claudisnei', 'claudisnei@gmail.com', 48);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'Maria', 'Maria@gmail.com', 34);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'João', 'joao@gmail.com', 58);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'Caroline', 'carol@gmail.com', 15);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'Sthefany', 'sthefany@gmail.com', 18);

INSERT INTO usuarios (nome, email, idade) VALUES(
    'Debora', 'debora@gmail.com', 38);

DELETE FROM usuarios WHERE nome = 'João';

UPDATE usuarios SET nome = "Nome de Teste" WHERE nome = 'Maria';

