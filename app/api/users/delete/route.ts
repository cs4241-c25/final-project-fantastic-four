import { authOptions } from "@/lib/auth";
import {MongoClient} from "mongodb";
import { getServerSession } from "next-auth";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let user = null

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if(!session || !(session.user!.role == 'admin')){
      return NextResponse.json({}, {status: 403})
    }
    
    await client.connect();
    user = await client.db("fantastic-four").collection("users");
    const {email} = await request.json();
    const result = await user.deleteOne({"email": email});

    if (result) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to delete user"}, {status: 500});
    }
}