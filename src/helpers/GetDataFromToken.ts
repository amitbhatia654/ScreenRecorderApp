import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || " ";
    const decodedToken = jwt.verify(token, "amit bhai ji");
    //console.log(decodedToken, "the all token data is ");
    return decodedToken;
  } catch (error) {
    console.log(error);
  }
};
