"use client";
import React from 'react'
import {useForm} from "react-hook-form";
import  Link from "next/link"
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from 'next/navigation';

export default function Signup() {
  const route=useRouter();
  const {handleSubmit,register} =useForm();
  
  const handleRegister=async(data:any)=>{
    //console.log("All data is ",data)
    
    const result =await axios.post('/api/users/signup',data);
    console.log("the response is",result.data.message);
    toast.success(result.data.message);
    route.push('/login')
  }
  

  return (
    
      <form onSubmit={handleSubmit(handleRegister)}>
       <h1>My SignUp Page</h1><br></br>
       Name <input type="text" {...register("name")}/><br></br>
       Email <input type="text" {...register("email")}/><br></br>

       Password <input type="password" {...register("password")}/><br></br>

       <button > Submit</button><br></br>
       <Link href="/login">Login Me</Link>



<Toaster />
      </form>
    
  )
}
