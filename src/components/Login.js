import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './Firebase';

const Login = (props) => {
    const firebase = useContext(FirebaseContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ btn, setBtn ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {
        if(password.length > 5 && email !== '') {
            setBtn(true)
        } else if(btn) {
            setBtn(false);
        }
    }, [password, email, btn]);

    const handleSubmit = e => {
        e.preventDefault();

        firebase.loginUser(email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            props.history.push('/welcome');
        })
        .catch(error => {
            setErrorMessage(error);
            setEmail('');
            setPassword('');
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                    {!!errorMessage && <span>{errorMessage.message}</span> }
                    <h2 style={{marginTop: "20px"}}>Login</h2>
                        <form onSubmit={handleSubmit}>  
                            <div className="inputBox">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="off" 
                                    required 
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="off" 
                                    required 
                                />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                           {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? S'inscrire maintenant.</Link>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Login;
