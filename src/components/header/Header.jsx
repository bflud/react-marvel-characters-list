import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

const Header = ({ logoSrc, name, title, squareText }) => {
    return (
        <div className="container-fluid py-2">
            <div className="row align-items-center px-3">
                <div className="col-md-2 col-4 logo">
                    <img src={logoSrc} alt="Logo" className="img-fluid" />
                </div>
                <div className="col-md-10 col-8 header-right d-flex justify-content-end align-items-center">
                    <div className="d-flex flex-column">
                        <span className="header-name mr-2">{name}</span>
                        <span className="d-md-none header-title mr-2">{title}</span>
                    </div>

                    <span className="d-none d-md-block header-title">{title}</span>
                    <span className="header-square">{squareText}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
