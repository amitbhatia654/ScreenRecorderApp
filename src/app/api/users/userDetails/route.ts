import { GetDataFromToken } from "@/helpers/GetDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = GetDataFromToken(request);
    //console.log(user, "we get data from the user Function");
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "something wrong in userDetail api" });
  }
}
