import { MOM } from "@/app/types";
import MOMdb from "../../models/meeting";
import { NextResponse } from "next/server";

export default async function GET({params,}: { params: Promise<{ slug: string }>;},req: Request,res: NextResponse){
  const slug = (await params).slug;
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
