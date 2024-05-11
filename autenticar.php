<?php
// Obtém os dados do formulário de login
$email = $_POST['email'];
$senha = $_POST['password'];

// Envia uma solicitação para o MockAPI para verificar as credenciais
$api_url = 'https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/usuarios?search=' . urlencode('email:' . $email . ',password:' . $senha);
$response = file_get_contents($api_url);

if ($response !== false) {
    $usuarios = json_decode($response, true);
    if (!empty($usuarios)) {
        // Usuário autenticado com sucesso
        session_start();
        $_SESSION['email'] = $email;
        header("Location: dashboard.php"); // Redireciona para a página de dashboard
    } else {
        // Usuário ou senha inválidos
        echo "E-mail ou senha incorretos. <a href='login.php'>Tente novamente</a>.";
    }
} else {
    // Erro ao acessar o MockAPI
    echo "Erro ao acessar o servidor. Por favor, tente novamente mais tarde.";
}
?>
