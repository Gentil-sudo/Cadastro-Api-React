import './style.css';
import Trash from '../../assets/trash.svg';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
    const [users, setUsers] = useState([]);

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    async function getUsers() {
        const usersFromApi = await api.get('/usuarios');
        setUsers(usersFromApi.data);
    }

    async function createUsers() {
        await api.post('/usuarios', {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        });
        getUsers()
    }

    async function deleteUsers(id) {
        await api.delete('/usuarios/${ id }');

        getUsers()
    }


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className='home-body'>
            <div className='card-body'>
                <div className='card'>
                    {users.map((user) => (
                        <div key={user.id} className='card-map'>
                            <div className='card-container'>
                                <div>
                                    <img src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt={user.name} className='user-img' />
                                </div>
                                <div>
                                    <p>Nome <span>{user.name}</span></p>
                                    <p>Idade <span>{user.age}</span></p>
                                    <p>E-mail <span>{user.email}</span></p>
                                </div>
                                <button onClick={() => deleteUsers(user.id)} className='del-img'>
                                    <img src={Trash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container'>
                <form className='form-body'>
                    <h1>Cadastro de Usuários</h1>
                    <input placeholder="Digite seu nome" type="text" name='nome' ref={inputName} className='form-input' />
                    <input placeholder="Digite sua idade" type="number" name='idade' ref={inputAge} className='form-input' />
                    <input placeholder="Digite seu e-mail" type="email" name="email" ref={inputEmail} className='form-input' />
                    <button type='button' onClick={createUsers} className='form-btn'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
