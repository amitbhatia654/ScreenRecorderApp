"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route=useRouter();
  const loggingOut=async()=>{
    const {data}=await axios.get('/api/users/logout');
    if(data.message=="User logout successfully")
    route.push('/login')
    
  }
  return (
    <div>
      welcoem to teh profile page<br></br>
      <button onClick={loggingOut}>Logout</button>
      <Link href={"/login"}>Goto Login </Link>
    </div>
  )
}
