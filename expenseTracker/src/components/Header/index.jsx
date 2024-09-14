import React from 'react'

function Header() {

  function logout(){
    alert("LogOut")
  }

  return (
    <div className='bg-blue-400 p-3 sticky top-0 left-0 w-[100vw] flex justify-between items-center'>
      <p className='font-semibold text-white text-2xl'>Finance</p>
      <p className='cursor-pointer mr-5' onClick={logout}>
        Logout
      </p>
    </div>
  )
}

export default Header