import React, { useState } from 'react'
import Input from '../Input'

function SignupSignin() {

  const [name,setname] = useState("")
 

  return (
    <div className='w-[70%] max-w-[600px] h-auto shadow-teal-300 shadow-lg p-4'>
      <h2 className='font-bold text-lg text-center m-0 mb-3'>SignUp on <span className='text-blue-600 font-semibold'>Financely</span></h2>
      <form action="">
        <Input label={"Full Name"} state={name} setState={setname} placeholder={"John doe"}/>
      </form>
    </div>
  )
}

export default SignupSignin