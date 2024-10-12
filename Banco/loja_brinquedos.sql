-- Criação do banco de dados
CREATE DATABASE loja_brinquedo;

-- Selecionar o banco de dados
USE loja_brinquedo;

-- Criação da tabela de produtos
CREATE TABLE produtos (
    codigo INT NOT NULL PRIMARY KEY,  -- Definindo o tipo e a chave primária
    nome VARCHAR(255),
    valor DECIMAL(10, 2),
    descricao TEXT,
    categoria VARCHAR(255)
);
