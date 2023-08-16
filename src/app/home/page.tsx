/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect,useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { useFormState } from 'react-hook-form';
import Image from 'next/image';

export default function page() {

  useEffect(()=>{
    getAllPost();
  },[])

  const [allPosts,setAllPosts]=useState([])

  const getAllPost=async()=>{
    const {data}=(await axios.get("/api/users/userDetails"));
    const id=data.UserDetails._id;
    //console.log(id,'the res');
    const res=await axios.get("/api/users/posts",{params:{id}})
    //console.log(res.data,'the ressss');
    setAllPosts(res.data);
  }

  return (
    <div>
      <Navbar></Navbar>

    {
      allPosts.length==0?
      
    <div className='border '>No post Available!</div>
    :
    
    allPosts.map((data,key)=>{
      return(
        
        <div key={data._id} className='border my-4'>
        <div >Title:{data?.title}</div>
        <Image src={data.image} height={200} width={200} alt="pic"></Image>
        <div>Location : {data.location}</div>
        </div>

        
      )
    })

    
  
  }

      
    </div>
  )
}
