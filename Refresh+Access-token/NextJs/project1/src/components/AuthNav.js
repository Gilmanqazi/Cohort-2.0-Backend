import Link from 'next/link'
import React from 'react'

const AuthNav = () => {
  return (
    <div className='flex gap-7'>
      <Link href={"/authLayout/login"}>Login</Link>
      <Link href={"/authLayout/register"}>Register</Link>
    </div>
  )
}

export default AuthNav