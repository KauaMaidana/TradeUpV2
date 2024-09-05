import Navbar from "./navbar";

import { FaUser } from 'react-icons/fa';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Navbar />
            <div className="container">
                <FaUser />
                <h2>Meus dados</h2>
                {user ? (
                    <>
                    <div className="user-data">
                        <div className="">
                        <span>Nome</span>
                        <input type="text" value={user.name} readOnly />
                        </div>
                        <div className="">
                        <span>Email</span>
                        <input type="text" value={user.email} readOnly />
                        </div>
                        <div className="">
                        <span>Data de nascimento</span>
                        <input type="date" value={user.dataNasc} readOnly />
                        </div>
                        <div className="">
                        <span>CPF</span>
                        <input type="text" value={user.cpf} readOnly />
                        </div>
                    </div>
                    </>
                ) : (
                    <p>Nenhum usuário logado.</p>
                )}
            </div>
        </>
    );
}

export default Profile;