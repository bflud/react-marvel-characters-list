import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./input.css";

const Input = ({
    title,
    subtitle,
    placeholder,
    type = "text",
    icon,
    onChange,
    onBlur,
    onFocus,
    validate,
    errorMessage
}) => {
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        if (onChange) onChange(e);
        const isValid = validate ? validate(e.target.value) : true;
        setError(isValid ? "" : errorMessage || "Invalid input");
    };

    const handleInputBlur = (e) => {
        if (onBlur) onBlur(e);
        if (validate) {
            const error = validate(e.target.value);
            setError(error);
        }
    };

    const handleInputFocus = (e) => {
        if (onFocus) onFocus(e);
        setError("");
    };

    return (
        <div className="main-input">
            <div className="text-left">
                <h2>{title}</h2>
                <b>
                    <span >{subtitle}</span>
                </b>
                <div className="input-group search mt-2">
                    <input
                        type={type}
                        className={`form-control  ${error ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={icon} />
                        </span>
                    </div>
                </div>
                {error && <div className="invalid-feedback">{errorMessage || error}</div>}
            </div>
        </div>
    );
};

export default Input;
