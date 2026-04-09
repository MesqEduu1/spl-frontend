import './style.css'
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMensagemErro("");

    if (!validarEmail(email)) {
      setMensagemErro("Digite um e-mail válido.");
      return;
    }

    if (email === "test@mail.com" && senha === "senha") {
      alert("Em breve o dashboard será disponibilizado.");
    } else {
      setMensagemErro(
        "Usuário ou senha inválido. Caso não seja cadastrado, crie uma conta!"
      );
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="logo">+</div>
        <div className="brand">SPL</div>
        <div className="subtitle">Saúde em Primeiro Lugar</div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">Entrar</button>

          {mensagemErro && (
            <div className="mensagem">{mensagemErro}</div>
          )}

        </form>

        <p className="footer">
          Não tem conta? <Link to="/Register">Criar conta</Link>
        </p>

      </div>
    </div>
  )
}

export default Home