<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "../conecta.php";

// recebe dados enviados pelo React
$dados = json_decode(file_get_contents("php://input"), true);

$email = $dados["email"];
$senha = $dados["senha"];

// verifica se usuário existe
$sql = $con->prepare("SELECT id, nome, email, senha, tipo_usuario FROM usuarios WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();
$resultado = $sql->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Email não encontrado."]);
    exit;
}

$usuario = $resultado->fetch_assoc();

// compara senha
if ($senha !== $usuario["senha"]) {
    echo json_encode(["status" => "erro", "mensagem" => "Senha incorreta."]);
    exit;
}

// login aprovado
echo json_encode([
    "status" => "ok",
    "mensagem" => "Login realizado com sucesso!",
    "usuario" => [
        "id" => $usuario["id"],
        "nome" => $usuario["nome"],
        "email" => $usuario["email"],
        "tipo_usuario" => $usuario["tipo_usuario"]
    ]
]);
