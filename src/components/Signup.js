import React, { useState, useContext } from 'react'

import { Link } from 'react-router-dom';

import { FirebaseContext } from './Firebase';

const Signup = (props) =>  {

    const firebase = useContext(FirebaseContext);

    const [ pseudo, setPseudo ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        firebase.signupUser(email, password)
        .then(user => {
            setPseudo('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            props.history.push('/welcome');
        })
        .catch(error => {
            setErrorMessage(error);
            setPseudo('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        })
    }


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {!!errorMessage && <span>{errorMessage.message}</span> }
                    <h2 style={{marginTop: "20px"}}>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input 
                                    type="text" 
                                    value={pseudo}
                                    onChange={e => setPseudo(e.target.value)}
                                    autoComplete="off" 
                                    required 
                                />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
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
                            <div className="inputBox">
                                <input 
                                    type="password" 
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    autoComplete="off" 
                                    required 
                                />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {pseudo === '' || email === '' || password === '' || confirmPassword === '' || 
                                password !== confirmPassword ? 
                                  <button disabled>Inscription</button>
                                : <button>Inscription</button>
                            }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez vous.</Link>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Signup;
