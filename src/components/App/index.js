import React from "react";
import "../../App.css";
import Routes from "../../routes";
import { IconContext } from "react-icons";

import Header from "../Header";
import Footer from "../Footer";

function App() {
    return (
        <div>
            <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
                <Header />
                <Routes />
                <Footer />
            </IconContext.Provider>
        </div>
    );
}

export default App;
