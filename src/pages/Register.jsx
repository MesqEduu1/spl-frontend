import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({
    nome: '', cpf: '', telefone: '', email: '', senha: '', confirmaSenha: ''
  })

  const [erros, setErros] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiErro, setApiErro] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErros(prev => ({ ...prev, [name]: '' }))
  }

  function validar() {
    const erros = {}

    if (!form.nome.trim())
      erros.nome = 'Nome é obrigatório.'

    if (form.cpf.replace(/\D/g, '').length !== 11)
      erros.cpf = 'CPF deve ter 11 dígitos.'

    if (!form.telefone.trim())
      erros.telefone = 'Telefone é obrigatório.'

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      erros.email = 'E-mail inválido.'

    if (form.senha.length < 8)
      erros.senha = 'A senha deve ter pelo menos 8 caracteres.'

    if (form.senha !== form.confirmaSenha)
      erros.confirmaSenha = 'As senhas não coincidem.'

    return erros
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    setLoading(true)
    setApiErro('')

    try {
      const resposta = await api.post('/auth/cadastro', form)
      localStorage.setItem('spl_token', resposta.data.token)
      navigate('/triagem')
    } catch (erro) {
      if (erro.response) {
        setApiErro(erro.response.data.erro)
      } else {
        setApiErro('Não foi possível conectar ao servidor. Tente novamente mais tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="logo">+</div>
        <div className="brand">SPL</div>
        <div className="subtitle">Saúde em Primeiro Lugar</div>

        <h1>Criar sua conta</h1>

        {apiErro && <p style={{ color: 'red' }}>{apiErro}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome completo</label>
            <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
            {erros.nome && <span style={{ color: 'red' }}>{erros.nome}</span>}
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input type="text" name="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} />
            {erros.cpf && <span style={{ color: 'red' }}>{erros.cpf}</span>}
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input type="text" name="telefone" placeholder="(00) 00000-0000" value={form.telefone} onChange={handleChange} />
            {erros.telefone && <span style={{ color: 'red' }}>{erros.telefone}</span>}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input type="email" name="email" placeholder="Digite seu E-mail" value={form.email} onChange={handleChange} />
            {erros.email && <span style={{ color: 'red' }}>{erros.email}</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" name="senha" placeholder="Mínimo 8 dígitos" value={form.senha} onChange={handleChange} />
            {erros.senha && <span style={{ color: 'red' }}>{erros.senha}</span>}
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input type="password" name="confirmaSenha" placeholder="Mínimo 8 dígitos" value={form.confirmaSenha} onChange={handleChange} />
            {erros.confirmaSenha && <span style={{ color: 'red' }}>{erros.confirmaSenha}</span>}
          </div>

          <button type="submit" className="btn" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</button>
        </form>

        <p className="footer">
          Já tem uma conta? <Link to="/">Fazer login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register