/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useState,useEffect} from 'react'

export default function page() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    
    getUser();
  },[])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route=useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [username,setUsername]=useState("")
  const [details,setDetails]=useState({email:"",name:""});
  const loggingOut=async()=>{
    const {data}=await axios.get('/api/users/logout');
    if(data.message=="User logout successfully")
    route.push('/')
  }

  const getUser=async()=>{
    const {data}=await axios.get("/api/users/userDetails"); 
    setDetails(data.user);
  }
  return (
    <div>
      <button onClick={loggingOut}>Logout</button><br></br>
      welcome to the profile page<br></br>

      <table>
        <thead>
        <tr>
          <td>Name</td>
          <td>{details?.name}</td>
        </tr>

        <tr>
          <td>Email</td>
          <td>{details?.email}</td>
        </tr>
        </thead>
      </table>
      
      <br></br>
      <Link href={"/"}>Goto Login </Link>

    </div>
  )
}
