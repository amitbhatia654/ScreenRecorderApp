"use client";
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route =useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {handleSubmit,register} =useForm()

  const loginDetails=async(details:any)=>{
    const {data}=await axios.post('/api/users/login',details);
    console.log(data.message);
    if(data.message=="yeah created token")
    route.push("/profile");
  }
  return (
    <div >
<form onSubmit={handleSubmit(loginDetails)}>
  Email<input type="text"  placeholder='Enter Your Email' {...register("email")}/><br></br>
  Password <input type="password" placeholder='Enter Your Password' {...register("password")}/><br></br>
  <button type='submit'> Submit</button>
</form>
  <Link href="/">Go to Sign Up page</Link>
    </div>
  )
}
