import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "./Firebase";
import ReactTooltip from "react-tooltip";

const Logout = () => {
    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            console.log("deconnexion");
            firebase.signoutUser();
        }
    }, [checked, firebase]);

    const handleChecked = e => {
        setChecked(e.target.value);
    };

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input onChange={handleChecked} type="checkbox" checked={checked} />
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip effect="solid" place="left" />
        </div>
    );
};

export default Logout;
