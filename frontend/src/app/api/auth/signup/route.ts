import { AuthResp } from "@/app/types";
import mongoose from "mongoose";
import {User} from "../../models/user";
import { NextResponse,NextRequest } from "next/server";
const mongoServer = process.env.MONGO_URI || 'your_default_mongo_uri';

async function connect() {
  return mongoose.connect(mongoServer)
  .then(() => {console.log("Connected to MongoDB")})
  .catch((err) => {console.error(err)});    
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connect();

    try{
        const newUser: AuthResp = await req.json();
        const { email, password, googleId, authType } = newUser;
        if(authType === "google" && googleId){
            const user = await User.findOne({ googleId });
            if(user) return NextResponse.json({ error: "User already exists" },{status: 400});

            const newUser = new User({
                email,
                googleId,
                authType
            });

            await newUser.save();
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        }
        if(authType=="local"){
            const user = await User.findOne({ email});
            if(user) return NextResponse.json({ error: "User already exists" },{status: 400});

            const hashedPassword = password
            const newUser = new User({
                email,
                password: hashedPassword,
                authType
            });

            await newUser.save();
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        }
    }catch{
        return NextResponse.json({ error: "Internal Server Error" },{status: 500});
    }
}