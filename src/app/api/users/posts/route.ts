import connect from "@/dbConfig/dbConfig";
import posts from "@/models/allPost";
import { isValidObjectId } from "mongoose";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    //console.log(reqBody, "api calledd");
    const res = await new posts({
      title: reqBody.title,
      image: reqBody.image,
      location: reqBody.location,
      userId: reqBody.userId,
    }).save();
    return NextResponse.json({ message: "Post Saved SuccessFully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Post Not Saved ");
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = request.nextUrl.searchParams.get("id");
    if (data) {
      var result = await posts.find({ userId: data });
    } else {
      var result = await posts.find();
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "There Must be an error" });
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const res = await posts.findByIdAndUpdate(
      { _id: reqBody.id },
      { title: reqBody.title, image: reqBody.image }
    );
    return NextResponse.json({
      message: "Post Updated Successfully",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Post Can't be updated" });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = request.nextUrl.searchParams.get("id");
    const res = await posts.findByIdAndDelete({ _id: data });
    return NextResponse.json("Post Deleted Successfully");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Post not deleted" });
  }
}
