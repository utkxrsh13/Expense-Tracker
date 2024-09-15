import React from 'react'

function Button({text, onClick, blue, disabled}) {
  return (
    <div className={blue?"bg-emerald-400":"bg-amber-200"} onClick={onClick} disabled={disabled}>{text}</div>
  )
}

export default Button