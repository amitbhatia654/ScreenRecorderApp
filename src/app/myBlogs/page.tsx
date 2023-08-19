/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Image from "next/image";
import profilepic from "../profile/profilepic.jpg";
import { useForm } from "react-hook-form";

export default function page() {
  useEffect(() => {
    getMyAllPosts();
  }, []);

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [updateData, setUpdateData] = useState({ image: "", _id: "" });

  const { handleSubmit, register, setValue } = useForm();

  const getMyAllPosts = async () => {
    const { data } = await axios.get("/api/users/userDetails");
    const res = await axios.get("/api/users/posts", {
      params: { id: data.UserDetails._id },
    });
    setAllPosts(res.data);
  };

  const handleUpdate = (data: any) => {
    setUpdateData(data);
    setValue("title", data.title);
  };

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(Error);
    });
  }

  const saveUpdatedDetails = async (data: any) => {
    var imageData;
    if (data.image[0]) {
      imageData = await convertToBase64(data?.image[0]);
      const a: unknown = imageData;
      const b: string = a as string;
    }

    const newData = {
      image: imageData,
      title: data.title,
      id: updateData._id,
    };

    const res = await axios.put("/api/users/posts", newData);
    // console.log(res, "The final res is ");
  };

  const handleDelete = async (id: any) => {
    const con = confirm("Are you Sure You Want to Delete");
    if (con) {
      const { data } = await axios.delete("/api/users/posts", {
        params: { id },
      });

      if (data == "Post Deleted Successfully") {
        setAllPosts((data) => data.filter((post) => post._id != id));
      }
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="">
        <div className="container-fluid  my-4 ">
          <div className="row d-flex align-items-center justify-content-center ">
            {allPosts.length > 0
              ? allPosts.map((data) => {
                  return (
                    <div
                      className="col-md-3 border  mx-1 my-3 p-2 "
                      key={data._id}
                    >
                      {data.title}
                      <button
                        className="mx-2 btn btn-primary"
                        onClick={() => handleUpdate(data)}
                        data-toggle="modal"
                        data-target="#staticBackdrop"
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                      <br></br>
                      {data.image && (
                        <Image
                          src={data?.image}
                          height={300}
                          width={320}
                          alt="pic"
                          className=" img-responsive "
                        ></Image>
                      )}
                    </div>
                  );
                })
              : "sorry there is no post! "}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                Title : <input type="text" {...register("title")} />
                <Image
                  src={updateData.image || profilepic}
                  height={250}
                  width={250}
                  alt="profile Pic"
                ></Image>
                <br></br>
                Change Pic
                <input
                  type="file"
                  {...register("image")}
                  accept=".jpeg,.png,.jpg"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSubmit(saveUpdatedDetails)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
