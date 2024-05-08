<?php
// Dados de conexão ao banco de dados
$servername = "localhost"; // Endereço do servidor MySQL
$username = "root"; // Nome de usuário do MySQL
$password = "Anjo100%"; // Senha do MySQL
$dbname = "CodeTech"; // Nome do banco de dados

// Recebe os dados do formulário
$email = $_POST['email'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$password = $_POST['password'];

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Prepara e executa a query SQL para inserir os dados
$sql = "INSERT INTO usuarios (nome, email, telefone, senha) VALUES ('$name', '$email', '$phone', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}

// Fecha a conexão
$conn->close();
?>
