/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useFormState } from "react-hook-form";
import Image from "next/image";

export default function page() {
  useEffect(() => {
    getAllPost();
  }, []);

  const [allPosts, setAllPosts] = useState<any[]>([]);

  const getAllPost = async () => {
    const { data } = await axios.get("/api/users/userDetails");
    //const id = data.UserDetails._id;
    //console.log(id,'the res');
    const res = await axios.get("/api/users/posts");
    //console.log(res.data,'the ressss');
    setAllPosts(res.data);
  };

  return (
    <div>
      <Navbar></Navbar>

      {allPosts.length == 0 ? (
        <div className="border ">No post Available!</div>
      ) : (
        allPosts.map((data) => {
          return (
            <div
              key={data._id}
              className=" my-4  d-flex align-items-center justify-content-center"
            >
              <div>
                Title:{data?.title}
                <br></br>
                {data.image && (
                  <Image
                    src={data?.image}
                    height={250}
                    width={400}
                    alt="pic"
                  ></Image>
                )}
                <br></br>
                Location : {data.location}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
