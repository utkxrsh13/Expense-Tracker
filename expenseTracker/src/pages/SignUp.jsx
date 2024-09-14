import React from 'react'
import Header from '../components/Header'
import SignupSignin from '../components/SignupSignin'
function SignUp() {
  return (
    <div>
      <Header/>
      <div className='flex w-[100vw] h-[90vh] justify-center items-center'>
        <SignupSignin />
      </div>
    </div>
  )
}

export default SignUp