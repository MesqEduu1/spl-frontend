import "./style.css"
import { Link } from "react-router-dom";

function Register() {

  return (

<div className="container">

  <div className="card">

    <div className="logo">+</div>

    <div className="brand">SPL</div>
    <div className="subtitle">Saúde em Primeiro Lugar</div>

    <h1>Criar sua conta</h1>

    <form>

      <div className="form-group">
        <label>Nome completo</label>
        <input type="text" placeholder="Nome completo" required/>
      </div>

      <div className="form-group">
        <label>CPF</label>
        <input type="text" placeholder="000.000.000-00" required/>
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input type="text" placeholder="(00) 00000-0000" required/>
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input type="email" placeholder="Digite seu E-mail" required/>
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input type="password" placeholder="Mínimo 8 dígitos" required/>
      </div>

      <div className="form-group">
        <label>Confirmar senha</label>
        <input type="password" placeholder="Mínimo 8 dígitos" required/>
      </div>

      <button type="submit" className="btn">Criar conta</button>

    </form>

    <p className="footer">
      Já tem uma conta? <Link to="/">Fazer login</Link>
    </p>

  </div>

</div>

  )
}

export default Register