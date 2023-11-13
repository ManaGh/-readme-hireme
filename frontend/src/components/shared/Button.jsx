import React from 'react'
import "./Button.css"

const Button = ({buttonName}) => {
  return (
    <button className='btn'>{buttonName}</button>
  )
}

export default Button