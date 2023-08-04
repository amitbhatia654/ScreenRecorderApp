"use client"
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Login() {
  const route =useRouter();
  const {handleSubmit,register} =useForm()

  const loginDetails=async(details:any)=>{
    const {data}=await axios.post('/api/users/login',details);
    
    if(data.message=="yeah created token")
    route.push("/profile");
    else
    alert(data.message);
  }
  return (
    <div >
<form onSubmit={handleSubmit(loginDetails)}>
  Email<input type="text"  placeholder='Enter Your Email' {...register("email")}/><br></br>
  Password <input type="password" placeholder='Enter Your Password' {...register("password")}/><br></br>
  <button type='submit'> Submit</button>
</form>
  <Link href="/signup">Go to Sign Up page</Link>
    </div>
  )
}
