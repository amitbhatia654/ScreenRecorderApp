import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("delete  requueuuet");
    const response = NextResponse.json({
      message: "User logout successfully",
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
    });
  }
}
