import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [ btn, setBtn ] = useState(false);

    const refWolverine = useRef(null);
    
    useEffect(() => {
        refWolverine.current.classList.add("startingImg");

        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000)
    }, []);

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg")
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg")
        }
    }

    return (
        <main ref={refWolverine} className="welcomePage">
            { btn && 
              <>
                <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                    <Link to="/signup" className="btn-welcome">Inscription</Link>
                </div>
                <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                    <Link to="/login" className="btn-welcome">Connexion</Link>
                </div>
              </>
            }
            
        </main>
    )
}

export default Home;
