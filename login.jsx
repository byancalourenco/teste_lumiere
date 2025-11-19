import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    // navegação para redirecionar
    const navigate = useNavigate();

    // guardar infos
    const [email, setEmaillogin] = useState("");
    const [senha, setSenhalogin] = useState("");

    // função login
    const login = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch("http://localhost/backlumiere/usuarios/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha
                }),
            });

            const dados = await resposta.json();
            alert(dados.mensagem);

            // se login deu certo → ir para página inicial
            if (dados.status === "ok") {
                navigate("/Inicial");
            }

        } catch (erro) {
            console.log("Erro ao realizar login:", erro);
        }
    };

    return (
        <div className="container-fluid p-0">
            <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');`}
            </style>

            <div className="row">
                <div className="col-md-6 col-sm-12 entrar divbranca">
                    
                    <h1 className="textoazul" style={{fontWeight: "700", textAlign: "left"}}>
                        Faça seu login
                    </h1>

                    {/* Formulário */}
                    <form onSubmit={login}>

                        {/* email */}
                        <div className="divemail">
                            <img className="imgpessoa" src="/img/email.png" alt=""/>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        </div>
                        <input
                            type="email"
                            className="form-control input"
                            id="exampleFormControlInput1"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmaillogin(e.target.value)}
                            required
                        />

                        {/* senha */}
                        <div className="divsenha">
                            <img className="imgsenha" src="/img/senha.png" alt=""/>
                            <label htmlFor="inputPassword5" className="form-label textoazul">Senha</label>
                        </div>
                        <input
                            type="password"
                            id="inputPassword5"
                            className="form-control input"
                            placeholder="Sua senha"
                            value={senha}
                            onChange={(e) => setSenhalogin(e.target.value)}
                            required
                        />

                        {/* lembrar senha */}
                        <div className="lembrarsenha">
                            <input type="checkbox" className="form-check-input" id="remember"/>
                            <label className="form-check-label textoazul" htmlFor="remember">
                                Lembrar senha
                            </label>
                        </div>

                        {/* esqueceu senha */}
                        <div className="esqueceusenha">
                            <a className="textoazul" href="#">Esqueceu a senha?</a>
                        </div>

                        {/* botão de entrar */}
                        <button className="btnentrar textobranco btn" type="submit">
                            Entrar
                        </button>
                    </form>
                </div>

                {/* direita */}
                <div className="col-md-6 col-sm-12 criarconta divazul">

                    <h1 className="textobranco textoleft" style={{fontWeight: "700"}}>
                        Ainda não tem uma conta?
                    </h1>

                    <p className="textobranco textoleft">
                        Crie uma conta e faça suas avaliações!
                    </p>

                    <Link className="btnbranco textobranco btn" to="/criarconta">
                        Criar conta
                    </Link>

                    <Link to="/inicial">Ir para a página inicial</Link>

                    <img className="imglogologin" src="/img/logo.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Login;
