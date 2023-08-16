/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import axios from 'axios';

export default function page() {
    const {handleSubmit,register,reset} =useForm();
    const [postImage,setPostImage]=useState({myfile:''})

    const createPost=async(d:any)=>{
        const {data}=await axios.get("/api/users/userDetails");
        
        const imageData :unknown=await convertToBase64(d?.image[0]) 
        const b: string = imageData as string;
        setPostImage({...postImage,myfile:b});
        const allData={
            userId:data.UserDetails._id,
            title:d.title,
            image:imageData,
            location:d.location
        }
      const res=await axios.post('/api/users/posts',allData);
      //console.log(res.status,'the response is')
      reset();
    }

    function convertToBase64(file:any){
    return new Promise((resolve,reject)=>{
      const fileReader=new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>resolve(fileReader.result);
      fileReader.onerror=()=>reject(Error)
    })

  }
  return (
    <div>
        <Navbar></Navbar>
      <form onSubmit={handleSubmit(createPost)} >
        title: <input type="text" {...register("title")}/><br></br>
        image : <input type="file" {...register('image')} accept='.jpeg,.jpg,.png'/><br></br>
        {/* <Image height={200} width={300} alt='selected image' src={}></Image> */}
        location : <input type="text"  {...register('location')} /><br></br>
        <button type='submit' className=' btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}
