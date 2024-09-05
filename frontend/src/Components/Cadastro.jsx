import React, { useState } from 'react';
import '/src/Components/Cadastro.css';
import axios from 'axios';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [telefoneRecuperacao, setTelefoneRecuperacao] = useState('');
    const [email, setEmail] = useState('');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validações
        if (!nome) {
            tempErrors.nome = "Nome é obrigatório.";
            isValid = false;
        }
        if (!cpf) {
            tempErrors.cpf = "CPF é obrigatório.";
            isValid = false;
        }
        if (!telefone) {
            tempErrors.telefone = "Telefone é obrigatório.";
            isValid = false;
        }
        if (!email) {
            tempErrors.email = "E-mail é obrigatório.";
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                tempErrors.email = "Formato de e-mail inválido.";
                isValid = false;
            }
        }
        if (!emailRecuperacao) {
            tempErrors.emailRecuperacao = "E-mail de recuperação é obrigatório.";
            isValid = false;
        } else {
            const emailRecuperacaoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRecuperacaoRegex.test(emailRecuperacao)) {
                tempErrors.emailRecuperacao = "Formato de e-mail de recuperação inválido.";
                isValid = false;
            }
        }
        if (password.length < 6) {
            tempErrors.password = "A senha deve ter pelo menos 6 caracteres.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const cadastrar = async () => {
        try {
            const response = await axios.post('http://localhost:8090/usuario', {
                name: nome,
                cpf: cpf,
                telefone: telefone,
                telefoneRecuperacao: telefoneRecuperacao,
                dataNasc: dataNasc,
                email: email,
                emailRecuperacao: emailRecuperacao,
                password: password,
            });
            console.log('Cadastro realizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            cadastrar();
            setCpf('');
            setDataNasc('');
            setEmail('');
            setNome('');
            setPassword('');
            setTelefone('');
            setTelefoneRecuperacao('');
            setEmailRecuperacao('');
            alert('Usuário cadastrado com sucesso!');
        }
    };

    return (
        <div className="container">
            <img src="/src/assets/logo 2.png" alt="LoginSA/src/assets/logo 2.png" type="image/png" />
            <h2>Trade Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='formulario'>
                    <div className="labels">
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder='Nome completo'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        {errors.nome && <span className="error">{errors.nome}</span>}
                    </div>
                    <div className="labels">
                        <label>CPF</label>
                        <input
                            type="text"
                            placeholder="CPF/CNPJ"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        {errors.cpf && <span className="error">{errors.cpf}</span>}
                    </div>
                    <div className="grid">
                        <div className="labels">
                            <label>Telefone</label>
                            <input
                                type="number"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            {errors.telefone && <span className="error">{errors.telefone}</span>}
                        </div>
                        <div className="labels">
                            <label>Telefone de recuperação</label>
                            <input
                                type="number"
                                placeholder="Telefone de recuperação"
                                value={telefoneRecuperacao}
                                onChange={(e) => setTelefoneRecuperacao(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid">
                        <div className="labels">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="labels">
                            <label>Email de recuperação</label>
                            <input
                                type="email"
                                placeholder="E-mail de recuperação"
                                value={emailRecuperacao}
                                onChange={(e) => setEmailRecuperacao(e.target.value)}
                            />
                            {errors.emailRecuperacao && <span className="error">{errors.emailRecuperacao}</span>}
                        </div>
                    </div>
                    <div className="labels">
                        <label>Data de nascimento</label>
                        <input
                            type="date"
                            placeholder="Nascimento"
                            value={dataNasc}
                            onChange={(e) => setDataNasc(e.target.value)}
                        />
                    </div>
                    <div className="labels">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <button type='submit' className="submit-btn">
                    Cadastrar
                </button>
                <div className="signup-link">
                    <p>Já tem uma conta? <a href="/">Faça Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
