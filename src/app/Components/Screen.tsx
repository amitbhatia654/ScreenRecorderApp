"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Screen() {
  const [initialPreviewStream, setInitialPreviewStream] =
    useState<MediaStream>();
  function VideoPreview({ stream }: { stream: MediaStream | null }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    if (!stream) {
      return null;
    }

    return <video id="video-view" ref={videoRef} autoPlay />;
  }
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ screen: true });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <h2>Screen Recorder</h2>

          {!mediaBlobUrl && (
            <>
              {status == "recording"
                ? "Click On the Stop Button To Stop Screen Recording"
                : "Click On the Start Button To Start Screen Recording"}
              <br></br>

              {status != "recording" && (
                <button onClick={startRecording} className="btn btn-primary ">
                  Start Recording
                </button>
              )}

              {status == "recording" && (
                <button
                  onClick={stopRecording}
                  className="btn btn-primary mx-2"
                >
                  Stop Recording
                </button>
              )}
              <h3>Status: {status}</h3>
            </>
          )}

          {mediaBlobUrl && (
            <video src={mediaBlobUrl} controls width={600} height={410} />
          )}
          <br></br>

          {mediaBlobUrl && (
            <>
              <button onClick={clearBlobUrl} className="btn btn-primary mx-3">
                Record New{" "}
              </button>

              <a href={mediaBlobUrl || ""} download="myFile">
                <button className="btn btn-primary">Download file</button>
              </a>
            </>
          )}
          {/* <VideoPreview stream={initialPreviewStream || previewStream} /> */}
        </div>
      </div>
    </div>
  );
}
