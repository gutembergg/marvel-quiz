import React, { useState, useEffect, useContext } from 'react'

import { FirebaseContext } from './Firebase';


const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        if(checked) {
            console.log("deconnexion")
            firebase.signoutUser();
        }
    }, [checked, firebase])

    const handleChecked = e => {
        setChecked(e.target.value);
    }

    return (
        <div className="logoutContainer">
           <label className="switch">
               <input 
                  onChange={handleChecked}
                  type="checkbox"
                  checked={checked}
                />
                <span className="slider round" ></span>
           </label>
        </div>
    )
}

export default Logout;
