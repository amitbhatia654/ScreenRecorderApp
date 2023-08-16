/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import profilepic from './profilepic.jpg'
import { useForm } from 'react-hook-form'


export default function page() {

  const {register,handleSubmit}=useForm();
  const [postImage,setPostImage]=useState({myfile:""})
  const [details,setDetails]=useState({email:"",name:"",_id:"",aboutMe:''});

  useEffect(()=>{
    
    getUser();
  },[])

  function convertToBase64(file:any){
    return new Promise((resolve,reject)=>{
      const fileReader=new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>resolve(fileReader.result);
      fileReader.onerror=()=>reject(Error)
    })

  }

  const route=useRouter();
  
  const loggingOut=async()=>{
    const {data}=await axios.get('/api/users/logout');
    if(data.message=="User logout successfully")
    route.push('/')
  }

  
  const getUser=async()=>{
    const {data}=await axios.get("/api/users/userDetails"); 
    //console.log(data.UserDetails,'The khgggg')
    setDetails(data.UserDetails);
    setPostImage({...postImage,myfile:data.UserDetails.image})
  }

  const handleUpdate=async(data:any)=>{

const imageData=await convertToBase64(data?.image[0]) 
//console.log(imageData,'func called');
const a: unknown = imageData;
const b: string = a as string;

setPostImage({...postImage,myfile:b});
const userData={
  id:details._id,
  name:data.name,
  about:data.about,
  image:imageData
}
const res=await axios.put('/api/users/userDetails',userData);
console.log(res,'the respponse is');
  }
  return (
    <div>
      <Navbar></Navbar>
      <button  className='btn btn-primary'  onClick={loggingOut}>Logout</button><br></br>
      welcome to the profile page<br></br>

      <table>
        <thead>
          <tr><td>
          <Image src={postImage.myfile || profilepic} height={250} width={250} alt='profile Pic'></Image>
            </td>
          </tr>
        <tr>
          <td>Name</td>
          <td>{details?.name}</td>
        </tr>

        <tr>
          <td>Email</td>
          <td>{details?.email}</td>
        </tr>

        <tr>
          <td>About</td>
          <td>{details?.aboutMe}</td>
        </tr>
        </thead>
      </table>
      
      <br></br>
{/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
  Update Profile
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit(handleUpdate)}>
         
         <label htmlFor="profile-pic" >
          <Image src={postImage.myfile || profilepic} height={250} width={250} alt='profile Pic'></Image>
         </label>
         <br></br>
          <input type="file" id='profile-pic' {...register('image')}accept='.jpeg,.png,.jpg'/>
         Name: <input type="text"  {...register('name')}/><br></br>
         About: <input type="text" {...register('about')} /><br></br>
        <button type='submit' >Update</button>
        
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">cancel</button>
         <button type='button' className="btn btn-primary" data-dismiss="modal" >Done</button>
      </div>
    </div>
  </div>
</div>
   
    </div>
  )
}
