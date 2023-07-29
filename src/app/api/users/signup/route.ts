import connect from "@/dbConfig/dbConfig";
import User from "@/models/AllUsers";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    //check if user exist or not

    const existuser = await User.findOne({ email });

    if (existuser) {
      return NextResponse.json({
        message: "Email Already Exist !",
        status: 400,
      });
    }
    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    }).save();

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error, "having problems");
  }
}
