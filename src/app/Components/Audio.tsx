"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Audio() {
  const [initialPreviewStream, setInitialPreviewStream] =
    useState<MediaStream>();

  function VideoPreview({ stream }: { stream: MediaStream | null }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }

      //console.log(videoRef.current?.srcObject, "it is stream");
    }, [stream]);

    if (!stream) {
      return null;
    }

    return (
      <video
        id="video-view"
        ref={videoRef}
        autoPlay
        width={470}
        className="border border-primary rounded"
        height={355}
      />
    );
  }
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    resumeRecording,
    pauseRecording,
    clearBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ audio: true });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-6">
          <h2>Audio Recorder</h2>

          {!mediaBlobUrl && (
            <>
              {status == "recording"
                ? "Click On the Stop Button To Stop Recording"
                : "Click On the Start Button To Start Recording"}
              <br></br>
              {(status === "idle" || status == "stopped") && (
                <button onClick={startRecording} className="btn btn-primary ">
                  Start Recording
                </button>
              )}
              {(status == "recording" || status == "paused") && (
                <button
                  onClick={stopRecording}
                  className="btn btn-primary mx-2"
                >
                  Stop Recording
                </button>
              )}
              {status == "recording" && (
                <button
                  onClick={pauseRecording}
                  className="btn btn-primary mx-2"
                >
                  Pause Recording
                </button>
              )}
              {status == "paused" && (
                <>
                  <button
                    onClick={resumeRecording}
                    className="btn btn-primary mx-2"
                  >
                    Resume Recording
                  </button>
                </>
              )}

              <br></br>
              <h5>Status:{status}</h5>
            </>
          )}
          {mediaBlobUrl && (status == "idle" || status == "stopped") && (
            <>
              <video src={mediaBlobUrl} controls width={300} height={100} />
              <br></br>
              <button onClick={clearBlobUrl} className="btn btn-primary mx-2">
                Record New
              </button>
              <a href={mediaBlobUrl || ""} download="myFile">
                <button className="btn btn-primary">Download file</button>
              </a>
            </>
          )}
          {/* {status != "paused" && status != "stopped" && status != "idle" && (
            <VideoPreview stream={initialPreviewStream || previewStream} />
          )} */}
        </div>
      </div>
    </div>
  );
}
