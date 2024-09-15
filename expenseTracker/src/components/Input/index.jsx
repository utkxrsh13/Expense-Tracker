import React from 'react'

function Input({label, state, setState,placeholder,type}) {
  return (
    <div className=''>
      <p className='mb-1'>{label}</p>
      <input className='w-[100%] border-b-cyan-400 border-b-2 focus:outline-none mb-4 ' 
      type={type}
      placeholder={placeholder}
      value={state} onChange={(e)=> setState(e.target.value)}/>
    </div>
  )
}

export default Input