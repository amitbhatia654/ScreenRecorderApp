import connect from "@/dbConfig/dbConfig";
import posts from "@/models/allPost";
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
    //console.log(data, "the data is ");
    const result = await posts.find();
    //console.log(result, "the result is ");

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "There Must be an error" });
    console.log(error);
  }
}
