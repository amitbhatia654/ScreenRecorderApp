"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Screen from "./Screen";
import Video from "./Video";
import Audio from "./Audio";

export default function Navbar() {
  const [record, setRecord] = useState("video");
  const route = useRouter();

  return (
    <div className="sticky-top">
      <div className="p-3 container-fluid bg-danger  font-weight-bold border">
        <div className="row">
          <div className="col-md-9 ">
            <h3 className="text-white"> Screen Recorder</h3>
            <span className="text-black">Record Everything on your PC</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-5 my-2">
            <button
              className={
                record == "video"
                  ? `btn btn-success  mx-2 btn-lg`
                  : `btn btn-primary mx-2 btn-lg`
              }
              onClick={() => {
                setRecord("video");
              }}
            >
              {" "}
              Video{" "}
            </button>
            <button
              className={
                record == "screen"
                  ? `btn btn-success  mx-2 btn-lg`
                  : `btn btn-primary mx-2 btn-lg`
              }
              onClick={() => {
                setRecord("screen");
              }}
            >
              {" "}
              Screen{" "}
            </button>
            <button
              className={
                record == "audio"
                  ? `btn btn-success  mx-2 btn-lg`
                  : `btn btn-primary mx-2 btn-lg`
              }
              onClick={() => {
                setRecord("audio");
              }}
            >
              {" "}
              Audio{" "}
            </button>
          </div>
        </div>
      </div>
      <hr />

      {record === "video" && <Video></Video>}
      {record === "screen" && <Screen></Screen>}
      {record === "audio" && <Audio></Audio>}
      {/* <h3>Functionality of the free online video recorder Read more:</h3> */}
    </div>
  );
}
