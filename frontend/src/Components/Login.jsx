import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import '/src/Components/Login.css';
import axios from 'axios';


const Login = () => {
    const logar = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8090/api/login', {
                email: email,
                password: password,
            });
            return response;
        } catch (error) {
            throw error.response ? error.response.data : "Erro desconhecido";
        }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await logar(email, password);

            if (response.status === 200) {
                // Salvar informações do usuário no localStorage
                localStorage.setItem("user", JSON.stringify(response.data));

                // Redirecionar para a página inicial
                window.location.href = '/home';
            } else {
                alert('Usuário ou senha incorretos');
            }
        } catch (error) {
            alert(error);
            console.error('Erro ao se logar:', error);
        }
    };


    return (
        <div className="container">

            <form className='form-login'>
                <img src="/src/assets/logo 2.png" alt="LoginSA/src/assets/logo 2.png" type="image/png" />
                <h2>Trade Up</h2>
                <div className='input1'>
                    <FaUser className="icon" />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input2'>
                    <FaLock className="icon" />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="recall-forget">
                    <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Lembrar de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>
                <button type="button" onClick={handleLogin}>Entrar</button>
                <div className="signup-link">
                    <p>Não tem uma conta? <a href="/Cadastro">Cadastre-se</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;
