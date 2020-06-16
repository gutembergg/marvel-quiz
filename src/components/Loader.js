import React from "react";

const Loader = ({ text }) => {
    return (
        <>
            <div className="loader"></div>
            <p style={{ textAlign: "center", color: "red" }}>{text}</p>
        </>
    );
};

export default Loader;
