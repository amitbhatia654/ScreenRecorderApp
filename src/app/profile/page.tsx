"use client"
import axios from 'axios'
import Link from 'next/link'
import React from 'react'

export default function page() {
  const loggingOut=async()=>{
    const res=await axios.get('/api/users/logout');
    console.log(res,'the responsee is')
  }
  return (
    <div>
      welcoem to teh profile page<br></br>
      <button onClick={loggingOut}>Logout</button>
      <Link href={"/login"}>Goto Login </Link>
    </div>
  )
}
