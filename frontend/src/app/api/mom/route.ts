import { MOM } from "@/app/types";
import MOMdb from "../models/meeting";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response){
    const respBody = await res.json();

  try{
    const email = respBody.email
    if(!email){
      return NextResponse.json({message: "Invalid email"}, {status:404})
    }
    const meeting = await MOMdb.find({ email: email});
    return NextResponse.json(meeting, { status: 200 });
  }catch(err){
    console.error(err);
    return NextResponse.json({message: "Error fetching meeting"}, {status: 500});
  }
}