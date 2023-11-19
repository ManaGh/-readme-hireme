import React from "react";
import cyflogo from "../../images/cyf-logo.png";
import "./header.css"

export const Header = ()=>{
    return(
        <header>
            <img className="cyf-logo" src = {cyflogo} alt = "Code Your Future"/>
        </header>
    )
}