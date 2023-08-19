"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  useEffect(() => {
    userDetails();
  }, []);
  const route = useRouter();
  const [userName, setUserName] = useState("");
  const loggingOut = async () => {
    const { data } = await axios.get("/api/users/logout");
    if (data.message == "User logout successfully") route.push("/");
  };

  const userDetails = async () => {
    const { data } = await axios.get("/api/users/userDetails");
    setUserName(data.UserDetails.name);
  };
  return (
    <div className="sticky-top">
      <div className="p-3 container-fluid bg-warning  font-weight-bold border">
        <div className="row">
          <div className="col-md-9 text-white">InstaClick Blogging</div>
          <div className="col-md-3 text-black">
            welcome {userName}
            <button className="btn btn-danger mx-3" onClick={loggingOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <Link className="nav-item nav-link mx-2 " href="/home">
              Home{" "}
            </Link>
            <Link className="nav-item nav-link mx-2" href="/myBlogs">
              My Blogs
            </Link>
            <Link className="nav-item nav-link mx-2" href="/createPost">
              Create
            </Link>
            <Link className="nav-item nav-link mx-2" href="/profile">
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
