import React from 'react';

import Batman from '../images/batman.png';

const canterH2 = {
    textAlign: 'center',
    marginTop: '30px'
}

const centerImg = {
    display: 'block',
    margin: '40px auto'
}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
               <h2 style={canterH2}>Cette page n'existe pas !</h2> 
               <img style={centerImg} src={Batman} alt="errorPage"/>
            </div>  
        </div>
    )
}

export default ErrorPage;
