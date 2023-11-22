import React from 'react'
import "./Button.css"

const Button = ({buttonName}) => {
  return <button className="submit-btn landing-btn">{buttonName}</button>;
}

export default Button