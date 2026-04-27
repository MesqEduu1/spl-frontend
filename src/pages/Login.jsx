import './style.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMensagemErro("");

    if (!validarEmail(email)) {
      setMensagemErro("Digite um e-mail válido.");
      return;
    }

    try {

      const resposta = await api.post('/auth/login', {"email":email, "senha":senha})
      console.log(email)
      localStorage.setItem('spl_token', resposta.data.token)
      
      //navigate('/triagem')
    } catch (erro) {
      if (erro.response) {
            setMensagemErro(erro.response.data.erro)
      } else {
        setMensagemErro('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        console.log(erro)
      }
    } finally {
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