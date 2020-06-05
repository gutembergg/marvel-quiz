import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './Firebase';


const ForgotPassword = (props) => {

    const firebase = useContext(FirebaseContext);

    const [ email, setEmail ] = useState('');
    const [ success, setSuccess ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setErrorMessage(null);
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
            setEmail('');

            setTimeout(() => {
                props.history.push('/login');
            }, 5000)
        })
        .catch(error => {
            setErrorMessage(error);
            setEmail('');
        })
    }

    const disabled = email === '';

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                    {success && 
                    <span 
                        style={{border: "1px solid green", background: "green", color: "#ffffff"}}
                    >
                        {success}
                    </span>
                    }

                {errorMessage && <span>{errorMessage.message}</span>}
                    <h2 style={{marginTop: "40px"}}>Mot de passe oublié ?</h2>
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
                              <button type="submit" disabled={disabled} >Récupérer</button> 
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

export default ForgotPassword;
