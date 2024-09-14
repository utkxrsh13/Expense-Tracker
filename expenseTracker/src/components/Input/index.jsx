import React from 'react'

function Input({label, state, setState,placeholder}) {
  return (
    <div className=''>
      <p className='  '>{label}</p>
      <input className='' 
      placeholder={placeholder}
      value={state} onChange={(e)=> setState(e.target.value)}/>
    </div>
  )
}

export default Input